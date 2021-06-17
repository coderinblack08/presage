import React from "react";
import { useQuery } from "react-query";
import { Layout } from "../components/Layout";
import { Echo } from "../lib/types";
import { EchoCard } from "../modules/feed/EchoCard";

const Home: React.FC = () => {
  const { data: echos, isFetching } = useQuery<Echo[]>("/echo");

  return (
    <Layout>
      <main>
        <h4>Recommended Echos</h4>
        <div className="flex space-x-8 mt-5">
          {isFetching && !echos ? (
            <div className="spinner" />
          ) : (
            echos?.map((echo) => <EchoCard echo={echo} />)
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Home;
