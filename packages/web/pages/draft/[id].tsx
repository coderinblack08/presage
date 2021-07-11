import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { DraftEditor } from "../../modules/draft/DraftEditor";

const Publish: React.FC = () => {
  const {
    query: { id },
  } = useRouter();

  return (
    <Layout>
      <div className="flex items-start space-x-20">
        <div className="w-full">
          {id ? <DraftEditor id={id?.toString()} /> : null}
        </div>
      </div>
    </Layout>
  );
};

export default Publish;
