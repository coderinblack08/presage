import React from "react";
import { useQuery } from "react-query";
import { Button } from "../components/Button";
import { Layout } from "../components/Layout";
import { PresageCard } from "../modules/feed/PresageCard";
import { SideBar } from "../modules/feed/SideBar";
import { Presage } from "../types";

const Feed: React.FC = () => {
  const { data } = useQuery<Presage[]>("/api/presage");

  return (
    <Layout>
      <div className="flex space-x-12 justify-between items-start">
        <main>
          <h4>Your Personal, Curated Feed</h4>
          <p className="text-gray-300">
            <span className="text-primary">Did you know?</span> — Add filters to
            search through presages
          </p>
          <div className="flex items-center space-x-2 mt-4">
            <Button
              size="sm"
              color="gray"
              icon={<img src="/icons/filter.svg" />}
            >
              Filter
            </Button>
            <Button size="sm" color="gray">
              Customize
            </Button>
          </div>
          <div className="mt-14 space-y-16">
            {data?.map((presage) => (
              <PresageCard key={presage.id} presage={presage} compact />
            ))}
          </div>
        </main>
        <div className="hidden lg:block">
          <SideBar />
        </div>
      </div>
    </Layout>
  );
};

export default Feed;
