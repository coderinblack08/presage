import { NextPage } from "next";
import React from "react";
import { useCollection } from "../firebase";
import { useUser } from "../modules/auth/useUser";
import { JournalCard } from "../modules/dashboard/JournalCard";
import { Navbar } from "../modules/dashboard/Navbar";
import { JournalModal } from "../modules/journals/JournalModal";

const Dashboard: NextPage = ({}) => {
  const { uid } = useUser();
  const { data, isValidating } = useCollection("journals", [
    "my-journals",
    uid,
  ]);

  return (
    <div>
      <div className="max-w-6xl mx-auto">
        <Navbar />
      </div>
      <header className="pt-2 pb-8 border-b">
        <div className="grid grid-cols-3 gap-4 px-5 max-w-6xl mx-auto">
          {isValidating ? (
            <div className="spinner" />
          ) : (
            data?.map((journal: any) => (
              <JournalCard key={journal.id} journal={journal} />
            ))
          )}
          <JournalModal />
        </div>
      </header>
      <main className="max-w-6xl px-8 py-10 w-full mx-auto">
        <h2 className="font-bold font-display mb-3">Guides & Tutorials</h2>
        <div className="grid grid-cols-2 gap-4">
          <a className="block border shadow-sm rounded-xl p-6 ">
            <h2 className="font-bold text-xl">The Process of Brainstorming</h2>
            <p className="text-gray-500 mt-1">
              12 minute read · By J.K. Rowling
            </p>
          </a>
          <a className="block border shadow-sm rounded-xl p-5">
            <h2 className="font-bold text-xl">
              Monetize with Presage Subscriptions
            </h2>
            <p className="text-gray-500 mt-1">5 minute read · By Kevin Lu</p>
          </a>
        </div>
        <p className="mt-4 text-gray-500 text-sm leading-relaxed max-w-xl">
          Would you like to write a guide on writing for us? Do you have any
          other questions? If so reach out to us at{" "}
          <a
            href="mailto:help@joinpreage.com"
            className="text-gray-600 font-bold text-sm"
          >
            help@joinpreage.com
          </a>
          .
        </p>
      </main>
    </div>
  );
};

export default Dashboard;
