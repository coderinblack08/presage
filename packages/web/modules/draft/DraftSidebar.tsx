import { motion } from "framer-motion";
import React from "react";
import { Search } from "react-iconly";
import { Input } from "../../components/Input";
import { Sidebar } from "../../components/Sidebar";
import { useSSRQuery } from "../../lib/hooks/useSSRQuery";
import { Journal, Reward } from "../../lib/types";
import { CreateRewardModal } from "../rewards/CreateRewardModal";
import { UpdateRewardModal } from "../rewards/UpdateRewardModal";
import { CreateJournalModal } from "./CreateJournalModal";
import { DraftCollapsible } from "./DraftCollapsible";

interface DraftSidebarProps {}

export const DraftSidebar: React.FC<DraftSidebarProps> = ({}) => {
  const { data: journals } = useSSRQuery<Journal[]>("/journals/me");
  const { data: rewards } = useSSRQuery<Reward[]>("/rewards");

  return (
    <Sidebar
      footer={
        <div className="mt-12">
          <motion.div
            whileHover={{ height: "14rem" }}
            className="flex flex-col justify-between bg-white p-6 rounded-t-xl border-t border-gray-200/50 w-full"
          >
            <div>
              <h6 className="font-bold">Apply to Publish</h6>
              <p className="text-gray-600 font-normal text-sm mt-2">
                Since we&apos;re still in beta, publishing articles is only
                available for a select few. However, anyone can write and save
                drafts!
              </p>
            </div>
            <a
              href="#"
              className="font-semibold text-sm inline-block mt-4 hover:underline"
            >
              Apply Now →
            </a>
          </motion.div>
        </div>
      }
    >
      <div>
        <div className="relative mt-4 w-full">
          <Input placeholder="Search Drafts" className="w-full pl-12" />
          <div className="h-full mx-4 flex items-center pointer-events-none absolute top-0 left-0 text-gray-500">
            <Search size="small" stroke="bold" />
          </div>
        </div>
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h6 className="font-bold small text-gray-400">DRAFTS</h6>
            <CreateJournalModal />
          </div>
          {journals?.length === 0 ? (
            <p className="text-gray-400 mt-1 text-sm">No journals found</p>
          ) : null}
          {journals?.map((journal) => (
            <DraftCollapsible key={journal.id} journal={journal} />
          ))}
        </div>
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <h6 className="font-bold small text-gray-400">REWARDS</h6>
            <CreateRewardModal />
          </div>
          {rewards?.length === 0 ? (
            <p className="text-gray-500 mt-1 text-sm">No rewards found</p>
          ) : null}
          <ul className="mt-2">
            {rewards?.map((reward) => (
              <li key={reward.id}>
                <UpdateRewardModal reward={reward} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Sidebar>
  );
};
