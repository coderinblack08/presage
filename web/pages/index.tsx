import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { SoundbiteCard } from "../components/SoundBiteCard";
import { Layout } from "../layout/Layout";
import { supabase } from "../lib/supabase";

async function fetchSoundBites() {
  return await supabase.from("soundbites").select("*, users(*)").limit(10);
}

const Publishers: NextPage<{ soundbites?: any }> = ({ soundbites }) => {
  const { data, isValidating } = useSWR(
    "soundbites",
    async () => (await fetchSoundBites()).data,
    { revalidateOnFocus: false, initialData: soundbites }
  );

  return (
    <Layout>
      <div className="bg-gradient-to-b from-transparent to-[#1B202E80] pb-8 border-b border-darker-gray border-opacity-75">
        <main className="lg:max-w-7xl xl:max-w-8xl mx-auto w-full mt-16 px-6">
          <header className="mb-16">
            <h3>Your Personal, Curated Feed</h3>
            <p className="text-gray mt-2">
              Listen to your favorite{" "}
              <span className="text-faint-primary">short-form podcasts</span>{" "}
              and{" "}
              <span className="text-faint-primary">audio-centric content</span>
            </p>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {!isValidating ? (
              data?.map((bite) => <SoundbiteCard {...bite} />)
            ) : (
              <p>Loading...</p>
            )}
            <a href="#" className="text-primary lg:text-center lg:col-span-2">
              Show me more →
            </a>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const soundbites = await fetchSoundBites();
  return {
    props: {
      soundbites: soundbites.data,
    },
  };
};

export default Publishers;
