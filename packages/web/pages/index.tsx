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
              icon={
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.0586 9.49329H1.44153"
                    stroke="white"
                    strokeWidth="0.863932"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.559 9.49335C10.559 10.2886 9.91426 10.9333 9.11896 10.9333C8.32366 10.9333 7.67896 10.2886 7.67896 9.49335C7.67896 8.69745 8.32366 8.05334 9.11896 8.05334C9.91426 8.05334 10.559 8.69745 10.559 9.49335Z"
                    stroke="white"
                    strokeWidth="0.863932"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.94135 3.6311H10.559"
                    stroke="white"
                    strokeWidth="0.863932"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.44128 3.63104C1.44128 4.42693 2.08599 5.07104 2.88128 5.07104C3.67658 5.07104 4.32128 4.42693 4.32128 3.63104C4.32128 2.83575 3.67658 2.19104 2.88128 2.19104C2.08599 2.19104 1.44128 2.83575 1.44128 3.63104Z"
                    stroke="white"
                    strokeWidth="0.863932"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            >
              Filter
            </Button>
            <Button size="sm" color="gray">
              Customize
            </Button>
          </div>
          <div className="mt-14 space-y-12">
            {data?.map((presage) => (
              <PresageCard presage={presage} />
            ))}
          </div>
        </main>
        <SideBar />
      </div>
    </Layout>
  );
};

export default Feed;
