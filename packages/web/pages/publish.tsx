import React from "react";
import { Layout } from "../components/Layout";
import { DraftNavigator } from "../modules/draft/DraftNavigator";

const Publish: React.FC = () => {
  return (
    <Layout>
      <DraftNavigator />
    </Layout>
  );
};

export default Publish;
