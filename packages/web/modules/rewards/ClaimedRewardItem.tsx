import { format } from "date-fns";
import React, { useMemo } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { BASE_URL } from "../../lib/constants";
import { ClaimedReward } from "../../lib/types";

interface ClaimedRewardItemProps {
  claimed: ClaimedReward;
}

export const ClaimedRewardItem: React.FC<ClaimedRewardItemProps> = ({
  claimed,
}) => {
  const link = useMemo(() => {
    if (!claimed.reward) return "";
    if (claimed.reward.link && claimed.reward.type === "link") {
      return claimed.reward.link;
    }
    if (claimed.reward.type === "shoutout" && claimed.shoutoutArticle) {
      return `${BASE_URL}/article/${claimed.shoutoutArticle}`;
    }
    return "";
  }, [claimed]);

  return (
    <a
      className="group block hover:bg-gray-50 p-8 transition"
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex items-center space-x-3 focus:outline-none mb-4">
        <img
          src={claimed.user.profilePicture}
          alt={claimed.user.displayName}
          className="w-6 h-6 object-cover rounded-full"
        />
        <h6 className="font-semibold text-gray-800 leading-none">
          {claimed.user.displayName}
        </h6>
      </div>
      <h6 className="text-lg md:text-xl lg:text-2xl font-bold">
        {claimed.reward?.name}
      </h6>
      <p className="text-gray-600 mt-1">{claimed.reward?.description}</p>
      <div
        className={`flex items-center space-x-1.5 ${link ? "mt-1" : "mt-4"}`}
      >
        <div
          className={`text-sm font-semibold ${
            claimed.status === "declined" ? "text-red" : "text-gray-900"
          }`}
        >
          {claimed.status}
        </div>
        <span className="text-gray-500">·</span>
        <p className="text-gray-500 text-sm">
          Claimed at {format(new Date(claimed.createdAt), "MMMM dd, yyyy")}
        </p>
      </div>
      {link ? (
        <div className="inline-flex space-x-2 items-center mt-6 group-hover:underline text-gray-700">
          <HiOutlineExternalLink className="w-4 h-4" />
          <span className="font-bold text-sm">{link}</span>
        </div>
      ) : null}
    </a>
  );
};
