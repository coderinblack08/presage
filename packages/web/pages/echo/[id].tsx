/* eslint-disable @next/next/no-img-element */
import formatDuration from "format-duration";
import { GetServerSideProps } from "next";
import React from "react";
import { MdChevronRight, MdMusicNote, MdPlayArrow } from "react-icons/md";
import { useQuery } from "react-query";
import { Button } from "../../components/Button";
import { Layout } from "../../components/Layout";
import { Echo } from "../../lib/types";
import { usePlayerStore } from "../../modules/player/usePlayerStore";

const EchoPage: React.FC<{ id: string }> = ({ id }) => {
  const { data: echo, isFetching } = useQuery<Echo>(`/echo/${id}`);
  const play = usePlayerStore((x) => x.play);

  return (
    <Layout>
      {!echo && isFetching ? (
        <div className="spinner-primary" />
      ) : (
        <div className="flex flex-col sxl:flex-row justify-between gap-20">
          <div>
            <div>
              <header className="flex items-center justify-between gap-14">
                <div>
                  <h3>{echo?.title}</h3>
                  <div className="flex items-center gap-x-3 mt-1">
                    <img
                      src={echo?.user.profilePicture}
                      alt={echo?.user.displayName}
                      className="w-7 h-7 rounded-full"
                    />
                    <p className="text-gray-200">
                      {echo?.duration
                        ? formatDuration(echo?.duration * 1000) + " — "
                        : ""}
                      Published by{" "}
                      <span className="text-primary">
                        {echo?.user.displayName}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-end gap-x-4 mt-6">
                    <Button
                      icon={<MdPlayArrow className="w-6 h-6" />}
                      onClick={() => echo && play(echo)}
                    >
                      Play Echo
                    </Button>
                    <Button color="gray">Subscribe</Button>
                  </div>
                </div>
                <img
                  className="w-36 h-36 rounded-xl object-cover"
                  src={echo?.thumbnail}
                  alt={echo?.title}
                />
              </header>
              <div className="border-b border-gray-500 my-7" />
              <div className="space-y-4">
                <div className="flex items-center gap-x-0.5">
                  <span className="font-bold">Discover</span>
                  <MdChevronRight className="w-5 h-5" />
                  <span className="text-gray-200">{echo?.title}</span>
                </div>
                <p className="text-gray-300 leading-7">{echo?.description}</p>
                <div className="flex items-center gap-x-1 text-primary">
                  <MdMusicNote className="w-5 h-5" />
                  <p>186k Downloads</p>
                </div>
              </div>
            </div>
          </div>
          <aside className="sxl:max-w-md w-full flex-shrink-0">
            <nav className="flex items-center">
              <button className="font-bold border-b-2 text-primary border-primary pb-4 w-full">
                Coming Up
              </button>
              <button className="font-bold border-b-2 border-gray-500 pb-4 w-full">
                Transcript
              </button>
            </nav>
            <div>
              <article className="py-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-500" />
                  <div>
                    <h6 className="font-bold">The Joe Rogan Show</h6>
                    <p className="text-primary">Joe Rogan</p>
                  </div>
                </div>
                <div className="text-gray-200 font-semibold">1:12:54</div>
              </article>
            </div>
          </aside>
        </div>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.query.id,
    },
  };
};

export default EchoPage;
