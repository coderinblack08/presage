import React from "react";
import { RichTextEditor } from "../../editor/RichTextEditor";
import { DashboardLayout } from "../../modules/layout/DashboardLayout";

interface EditorPageProps {}

const EditorPage: React.FC<EditorPageProps> = ({}) => {
  return (
    <DashboardLayout>
      <main className="max-w-3xl mx-auto px-5 py-5 lg:py-12">
        <RichTextEditor />
      </main>
    </DashboardLayout>
  );
};

export default EditorPage;
