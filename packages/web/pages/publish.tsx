import React from "react";
import { Layout } from "../components/Layout";
import { DraftEditor } from "../modules/draft/DraftEditor";
import { DraftNavigator } from "../modules/draft/DraftNavigator";
import { useEditorStore } from "../modules/draft/useEditorStore";

const Publish: React.FC = () => {
  const draftId = useEditorStore((x) => x.draftId);

  return (
    <Layout>
      <div className="flex items-start space-x-20">
        <DraftNavigator />
        {draftId ? (
          <div className="w-full">
            <DraftEditor />
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default Publish;
