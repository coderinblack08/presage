import Link from "next/link";
import React from "react";
import { Search, Upload } from "react-iconly";
import {
  MdCloudUpload,
  MdFileDownload,
  MdFileUpload,
  MdImportExport,
  MdSort,
} from "react-icons/md";
import { useQuery } from "react-query";
import { Input } from "../../components/Input";
import { UserDropdown } from "../../components/UserDropdown";
import { Journal, Reward } from "../../lib/types";
import { CreateRewardModal } from "../rewards/CreateRewardModal";
import { UpdateRewardModal } from "../rewards/UpdateRewardModal";
import { CreateJournalModal } from "./CreateJournalModal";
import { DraftCollapsible } from "./DraftCollapsible";

interface DraftSidebarProps {}

export const DraftSidebar: React.FC<DraftSidebarProps> = ({}) => {
  const { data: journals } = useQuery<Journal[]>("/journals/me");
  const { data: rewards } = useQuery<Reward[]>("/rewards");

  return (
    <nav className="relative bg-gray-50 border-r border-gray-100 max-w-xs p-6 h-screen">
      <div className="flex items-center justify-between">
        <Link href="/explore">
          <a className="font-display font-bold text-xl leading-none">presage</a>
        </Link>
        <UserDropdown arrow />
      </div>
      <div className="relative mt-4 w-full">
        <Input placeholder="Search Drafts" className="w-full pl-12" />
        <div className="h-full mx-4 flex items-center pointer-events-none absolute top-0 left-0 text-gray-400">
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
          <p className="text-gray-400 mt-1 text-sm">No rewards found</p>
        ) : null}
        <ul className="space-y-3 mt-3">
          {rewards?.map((reward) => (
            <li key={reward.id}>
              <UpdateRewardModal reward={reward} />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
