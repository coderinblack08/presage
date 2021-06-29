import React from "react";
import { Layout } from "../components/Layout";
import { DraftEditor } from "../modules/draft/DraftEditor";

const Publish: React.FC = () => {
  return (
    <Layout>
      {/* <DraftNavigator /> */}
      <DraftEditor />
    </Layout>
  );
};

export default Publish;
