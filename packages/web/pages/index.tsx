import React from "react";
import { useQuery } from "react-query";
import {
  MdPlaylistAdd,
  MdPlayArrow,
  MdThumbUp,
  MdComment,
} from "react-icons/md";
import { Button } from "../components/Button";
import { Layout } from "../components/Layout";
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
            <div className="inline-block transform hover:-rotate-1 hover:scale-105 transition text-primary">
              Did you know?
            </div>{" "}
            — Add filters to search through presages
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
          <div className="mt-14">
            {data?.map((presage) => (
              <article className="flex items-start space-x-9" key={presage.id}>
                {presage.thumbnail && (
                  <div className="relative w-36 h-36 rounded-lg overflow-hidden">
                    <img
                      src={presage.thumbnail}
                      alt={presage.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="flex items-center justify-center absolute inset-0">
                      <button className="bg-gray-800 bg-opacity-85 backdrop-filter backdrop-blur-lg p-2.5 rounded-full">
                        <MdPlayArrow className="text-white w-6 h-6" />
                      </button>
                    </div>
                  </div>
                )}
                {presage.type === "audio" ? (
                  <div>
                    <h4>{presage.title}</h4>
                    <div className="text-gray-300 mt-1">
                      Published by{" "}
                      <a href="#" className="text-white">
                        {presage.user.displayName}
                      </a>{" "}
                      · {presage.createdAt}
                    </div>
                    {presage.description && (
                      <p className="mt-2">{presage.description}</p>
                    )}
                    <div className="flex items-center space-x-5 mt-4">
                      <button>
                        <MdThumbUp className="w-6 h-6" />
                      </button>
                      <button>
                        <MdComment className="w-6 h-6" />
                      </button>
                      <button>
                        <MdPlaylistAdd className="w-7 h-7" />
                      </button>
                    </div>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </main>
        <SideBar />
      </div>
    </Layout>
  );
};

export default Feed;
