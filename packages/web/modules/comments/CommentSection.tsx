import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "@firebase/firestore";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MdClose, MdSend } from "react-icons/md";
import useSWR, { mutate } from "swr";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Article, Comment as IComment } from "../../types";
import { useUser } from "../authentication/useUser";
import { Comment } from "./Comment";

interface CommentSectionProps {
  article: Article | undefined;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ article }) => {
  const { uid, user } = useUser();
  const [comment, setComment] = useState("");
  const defaultCommentPath = useMemo(
    () => `/articles/${article?.id}/comments`,
    [article?.id]
  );
  const [commentPath, setCommentPath] = useState(defaultCommentPath);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [replyingComment, setReplyingComment] = useState<IComment | null>(null);
  const { data: comments } = useSWR<IComment[]>(
    `/api/comments?path=/articles/${article?.id}/comments`
  );

  useEffect(() => {
    if (replyingComment) {
      inputRef.current?.focus();
    }
  }, [replyingComment]);

  return (
    <div>
      {replyingComment && (
        <div className="inline-flex items-center space-x-4 bg-gray-100 rounded-lg py-2 px-4 border text-sm text-gray-600 mb-2">
          <span>
            Replying to <strong>@{replyingComment.user.username}</strong>
          </span>
          <button
            onClick={() => {
              setReplyingComment(null);
              setCommentPath(defaultCommentPath);
            }}
          >
            <MdClose />
          </button>
        </div>
      )}
      <form
        className="flex items-center space-x-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const ref = collection(getFirestore(), commentPath);
          const data = {
            userId: uid,
            user: {
              profilePicture: user?.profilePicture,
              displayName: user?.displayName,
              username: user?.username,
            },
            message: comment,
            replyCount: 0,
            createdAt: serverTimestamp(),
          };
          const { id } = await addDoc(ref, data);
          mutate(
            `/api/comments?path=${commentPath}`,
            (old: IComment[]) => [{ id, ...data }, ...(old || [])],
            false
          );
          setComment("");
          setReplyingComment(null);
          setCommentPath(defaultCommentPath);
        }}
      >
        <img
          className={`object-cover w-12 h-12 rounded-xl ${
            !user?.profilePicture ? "border shadow-sm" : ""
          }`}
          src={user?.profilePicture || "/static/default-picture.svg"}
          alt={user?.displayName}
        />
        <Input
          ref={inputRef}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What’s on your mind?"
          outline
        />
        <Button
          icon={<MdSend className="w-5 h-5" />}
          color="black"
          size="large"
          className="h-full"
        >
          Send
        </Button>
      </form>
      <div className="space-y-12 mt-12">
        {comments?.map((comment) => (
          <Comment
            articleId={article?.id!}
            existingPath={defaultCommentPath}
            setReplyingComment={setReplyingComment}
            setCommentPath={setCommentPath}
            key={comment.id}
            comment={comment}
          />
        ))}
      </div>
    </div>
  );
};
