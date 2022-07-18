import React from "react";
import { ScrollArea } from "ui";
import { RichTextEditor } from "../../editor/RichTextEditor";
import { DashboardLayout } from "../../modules/layout/DashboardLayout";

interface EditorPageProps {}

const EditorPage: React.FC<EditorPageProps> = ({}) => {
  return (
    <DashboardLayout>
      <ScrollArea className="h-screen">
        <main className="max-w-3xl mx-auto px-5 py-12">
          <RichTextEditor />
        </main>
      </ScrollArea>
    </DashboardLayout>
  );
};

export default EditorPage;
