import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { Sidebar } from "../../components/Sidebar";
import { DirectMessage, Reward, User } from "../../lib/types";

interface MessageSidebarProps {}

export const MessageSidebar: React.FC<MessageSidebarProps> = ({}) => {
  const { data: dms } = useQuery<(DirectMessage & { reward: Reward })[]>(
    "/messages/dms"
  );
  const { data: me } = useQuery<User>("/me");

  function otherPerson(dm: DirectMessage) {
    return me?.id === dm.senderId ? dm.recipient : dm.sender;
  }

  return (
    <Sidebar>
      <div className="mt-10">
        <h6 className="font-bold small text-gray-400">MESSAGES</h6>
        {dms?.length === 0 ? (
          <p className="text-gray-400 mt-1 text-sm">No messages found</p>
        ) : null}
        <div className="grid gap-6 max-w-xs mt-4">
          {dms?.map((dm) => (
            <Link href={`/chat/${dm.id}`} key={dm.id}>
              <a className="rounded-lg flex items-center space-x-4">
                <img
                  src={otherPerson(dm).profilePicture}
                  alt={otherPerson(dm).displayName}
                  className="rounded-full w-10 h-10"
                />
                <div>
                  <h6 className="font-bold">{otherPerson(dm).displayName}</h6>
                  <p className="text-gray-600 small">
                    Regarding {dm.reward.name}
                  </p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Sidebar>
  );
};
