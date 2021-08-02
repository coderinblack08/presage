import { formatDistanceToNow } from "date-fns";
import { isEqual } from "lodash";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { dehydrate } from "react-query/hydration";
import { Button } from "../../components/Button";
import { useErrorStore } from "../../components/ErrorToast";
import { Input } from "../../components/Input";
import { ssrFetcher } from "../../lib/fetcher";
import { useSSRQuery } from "../../lib/hooks/useSSRQuery";
import { mutator } from "../../lib/mutator";
import { SocketContext } from "../../lib/socket";
import {
  ClaimStatus,
  DirectMessage,
  Message,
  Reward,
  User,
} from "../../lib/types";
import { DashboardLayout } from "../../modules/draft/DashboardLayout";
import { OpenButton } from "../../modules/draft/OpenButton";

const ChatPage: React.FC<{ id: string }> = ({ id }) => {
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const { data: dm } = useSSRQuery<DirectMessage & { reward: Reward }>(
    `/messages/dm/${id}`
  );
  const { data: messages } = useQuery<Message[]>(`/messages/${id}`, {
    staleTime: Infinity,
  });
  const { data: me } = useQuery<User>(`/me`);
  const { mutateAsync, isLoading } = useMutation(mutator);
  const [loadingState, setLoadingState] = useState<ClaimStatus>("pending");
  const queryClient = useQueryClient();
  const stake = useRef<HTMLDivElement | null>(null);

  function isMe(message: Message) {
    return me?.id === message.userId;
  }

  const errorHandler = (error: Error) => {
    if (!isEqual(error, {})) {
      useErrorStore.getState().setError(error);
      console.error(error);
    }
  };

  const handleNewMessage = useCallback(
    (data: Message) => {
      console.log(data);
      queryClient.setQueryData<Message[]>(`/messages/${id}`, (old) =>
        old ? [...old, data] : [data]
      );
      console.log(messages);
    },
    [id, messages, queryClient]
  );

  useEffect(() => {
    if (socket) {
      socket.emit("join room", id, errorHandler);
      socket.on("new message", handleNewMessage);
      socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
      return () => {
        socket.emit("leave room", id, errorHandler);
        socket.off("new message", handleNewMessage);
      };
    }
  }, [handleNewMessage, id, messages, queryClient, socket]);

  useEffect(() => {
    if (stake.current) {
      stake.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  function otherPerson(dm: DirectMessage) {
    return me?.id === dm.senderId ? dm.recipient : dm.sender;
  }

  async function completeReward(status: ClaimStatus) {
    setLoadingState(status);
    await mutateAsync([`/rewards/close/${id}`, { status }, "post"], {
      onSuccess: () => {
        queryClient.refetchQueries(`/messages/dm/${id}`);
      },
    });
  }

  return (
    <DashboardLayout message>
      <div className="flex flex-col justify-between w-full h-screen">
        <header className="max-w-3xl mx-auto w-full sticky top-0 px-6 md:px-0 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <OpenButton />
            <h1 className="text-lg font-bold">{otherPerson(dm).displayName}</h1>
          </div>
          {me?.id === dm.senderId ? null : !dm.open ? (
            <Button
              size="regular"
              rounded
              loading={isLoading && loadingState === "pending"}
              onClick={() => completeReward("pending")}
            >
              Reopen
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                loading={isLoading && loadingState === "declined"}
                onClick={() => completeReward("declined")}
                size="regular"
                color="gray"
                rounded
              >
                Reject
              </Button>
              <Button
                loading={isLoading && loadingState === "successful"}
                onClick={() => completeReward("successful")}
                size="regular"
                rounded
              >
                Finish
              </Button>
            </div>
          )}
        </header>
        <div className="pt-8 pb-14 max-w-3xl w-full mx-auto border-b border-gray-100 px-6 md:px-0">
          <h4>{dm.reward.name}</h4>
          <p className="text-gray-600">{dm.reward.description}</p>
          <div>
            <div className="inline text-gray-500 text-sm">
              Claimed{" "}
              {formatDistanceToNow(new Date(dm.claimedReward.createdAt), {
                addSuffix: true,
              })}{" "}
              ·{" "}
            </div>
            <Link href="/claimed-rewards">
              <a className="group inline-flex items-center space-x-2 mt-2">
                <div className="text-gray-500 text-sm group-hover:underline">
                  {" "}
                  Status: {dm.open ? "Pending" : dm.claimedReward.status}
                </div>
                <HiOutlineExternalLink className="w-4 h-4 text-gray-500" />
              </a>
            </Link>
          </div>
        </div>
        <main className="h-full w-full overflow-y-auto flex flex-col space-y-8 max-w-3xl mx-auto py-8 px-6 md:px-0">
          {messages?.map((message) => (
            <div
              key={message.id}
              className={`flex items-start ${
                isMe(message)
                  ? "flex-row-reverse justify-start"
                  : "justify-start"
              }`}
            >
              <img
                src={message.user.profilePicture}
                alt={message.user.displayName}
                className={`w-10 h-10 object-cover rounded-full ${
                  isMe(message) ? "ml-4" : "mr-4"
                }`}
              />
              <div
                className={`inline px-5 max-w-md rounded-3xl ${
                  message.message.length > 58 ? "py-3.5" : "py-2"
                } ${
                  isMe(message)
                    ? "bg-blue text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {message.message}
              </div>
            </div>
          ))}
          {!dm.open ? (
            <div className="pt-8">
              <hr className="border-b -mb-4" />
              <div className="flex justify-center">
                <p className="text-gray-500 bg-white px-5 inline">
                  This DM has been closed
                </p>
              </div>
            </div>
          ) : null}
          <div ref={stake} />
        </main>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (dm.open) {
              socket?.emit(
                "send message",
                { message: message.trim(), directMessageId: id },
                errorHandler
              );
              setMessage("");
            }
          }}
          className="w-full bg-white max-w-3xl px-6 md:px-0 mx-auto py-6 inset-x-0 flex items-center space-x-2"
        >
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="!rounded-full !px-5"
            gray
          />
          <Button
            type="submit"
            disabled={message.trim().length === 0 || !dm.open}
            rounded
          >
            Send
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("/me", ssrFetcher(context.req.cookies.jid));
  const id = context.query.id?.toString() || "";
  await queryClient.prefetchQuery(
    `/messages/dm/${id}`,
    ssrFetcher(context.req.cookies.jid)
  );
  await queryClient.prefetchQuery(
    `/messages/${id}`,
    ssrFetcher(context.req.cookies.jid)
  );

  const me = queryClient.getQueryData<User>("/me");
  if (!me) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ChatPage;
