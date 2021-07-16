import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Button } from "../components/Button";
import { Layout } from "../components/Layout";
import { Select } from "../components/Select";
import { Journal } from "../lib/types";
import { DraftList } from "../modules/draft/DraftList";
import { JournalNavbar } from "../modules/draft/JournalNavbar";
import { useNewDraft } from "../modules/draft/useNewDraft";

const Publish: React.FC = () => {
  const [currentJournal, setCurrentJournal] = useState<string | null>(null);
  const [published, setPublished] = useState(false);
  const { data: journals, isFetching } = useQuery<Journal[]>(
    `/articles/my-journals`
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
          <JournalNavbar
            currentJournal={currentJournal}
            updateJournal={(id: string) => setCurrentJournal(id)}
          />
          <div className="flex items-center space-x-2">
            <Select
              onChange={(e) => {
                switch (e.target.value) {
                  case "drafts":
                    setPublished(false);
                    break;
                  default:
                    setPublished(true);
                    break;
                }
              }}
            >
              <option value="drafts">Drafts</option>
              <option value="published">Published</option>
            </Select>
            <Button size="regular" onClick={() => newDraft(currentJournal)}>
              Create
            </Button>
          </div>
        </div>
        <DraftList published={published} journalId={currentJournal} />
      </div>
    </Layout>
  );
};

export default Publish;
