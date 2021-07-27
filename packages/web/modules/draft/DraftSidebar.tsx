import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "react-iconly";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";
import create from "zustand";
import { combine } from "zustand/middleware";
import shallow from "zustand/shallow";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { UserDropdown } from "../../components/UserDropdown";
import { useSSRQuery } from "../../lib/hooks/useSSRQuery";
import { Journal, Reward } from "../../lib/types";
import { CreateRewardModal } from "../rewards/CreateRewardModal";
import { UpdateRewardModal } from "../rewards/UpdateRewardModal";
import { CreateJournalModal } from "./CreateJournalModal";
import { DraftCollapsible } from "./DraftCollapsible";

interface DraftSidebarProps {}

export const useSidebarOpen = create(
  combine({ open: true }, (set) => ({
    setOpen: (state: boolean) => set({ open: state }),
  }))
);

export const DraftSidebar: React.FC<DraftSidebarProps> = ({}) => {
  const [open, setOpen] = useSidebarOpen((x) => [x.open, x.setOpen], shallow);
  const { data: journals } = useSSRQuery<Journal[]>("/journals/me");
  const { data: rewards } = useSSRQuery<Reward[]>("/rewards");

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.nav
          className="flex flex-col justify-between bg-gray-50 border-r border-gray-100 border-gray-200/50 max-w-xs w-full h-screen overflow-y-scroll"
          initial={{ opacity: 0, x: -500 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -500 }}
          transition={{ type: "keyframes", ease: "easeInOut" }}
          layout
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <UserDropdown fullName />
              <Button
                icon={
                  <HiOutlineChevronDoubleLeft className="w-5 h-5 text-gray-600" />
                }
                color="transparent"
                size="none"
                onClick={() => setOpen(false)}
              />
            </div>
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
              <ul className="space-y-3 mt-3">
                {rewards?.map((reward) => (
                  <li key={reward.id}>
                    <UpdateRewardModal reward={reward} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12">
            <motion.div
              whileHover={{ height: "14rem" }}
              className="bg-white p-6 rounded-t-xl border-t border-gray-200/50 w-full"
            >
              <h6 className="font-bold">Apply to Publish</h6>
              <p className="text-gray-600 font-normal text-sm mt-2">
                Since we&apos;re still in beta, publishing articles is only
                available for a select few. However, anyone can write and save
                drafts!
              </p>
              <a
                href="#"
                className="font-semibold text-sm inline-block mt-4 hover:underline"
              >
                Apply Now →
              </a>
            </motion.div>
          </div>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
};
