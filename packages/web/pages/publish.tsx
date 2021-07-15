import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useQuery } from "react-query";
import { Button } from "../components/Button";
import { Layout } from "../components/Layout";
import { Select } from "../components/Select";
import { Journal } from "../lib/types";
import { DraftList } from "../modules/draft/DraftList";
import { useNewDraft } from "../modules/draft/useNewDraft";

const Publish: React.FC = () => {
  const [currentJournal, setCurrentJournal] = useState<string | null>(null);
  const { data: journals, isFetching } = useQuery<Journal[]>(
    "/articles/my-journals"
  );
  const newDraft = useNewDraft();

  useEffect(() => {
    if (!isFetching && journals?.length) {
      setCurrentJournal(journals[0].id);
    }
  }, [journals, isFetching]);

  return (
    <Layout className="py-5 md:py-8">
      <div className="max-w-3xl mx-auto">
        <h4>My Drafts</h4>
        <div className="flex items-center justify-between mt-4">
          <nav className="flex items-stretch h-9 rounded-lg overflow-hidden bg-white divide-x divide-gray-200 border border-gray-200 shadow-sm">
            {journals?.map((journal) => (
              <button
                key={journal.id}
                className="h-full flex items-center space-x-2.5 px-3.5 focus:outline-none"
              >
                <img
                  src={journal.picture}
                  alt={journal.name}
                  className="flex-shrink-0 w-5 h-5 object-cover rounded-full"
                />
                <p className="text-gray-800 font-semibold">{journal.name}</p>
              </button>
            ))}
            <button className="h-full bg-gray-50 flex items-center space-x-2 px-3.5 focus:outline-none">
              <MdAdd />
            </button>
          </nav>
          <div className="flex items-center space-x-2">
            <Select>
              <option value="drafts">Drafts</option>
              <option value="published">Published</option>
            </Select>
            <Button size="regular" onClick={() => newDraft(currentJournal)}>
              Create
            </Button>
          </div>
        </div>
        <DraftList journalId={currentJournal} />
      </div>
    </Layout>
  );
};

export default Publish;
