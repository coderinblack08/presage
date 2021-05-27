import { GetServerSideProps, NextPage } from "next";
import React from "react";
import useSWR from "swr";
import { Banner } from "../components/Banner";
import { SoundbiteCard } from "../components/SoundBiteCard";
import { Layout } from "../layout/Layout";
import { supabase } from "../lib/supabase";

async function fetchSoundBites() {
  return await supabase
    .from("soundbites")
    .select("*, profiles:userId(*)")
    .limit(4);
}

const Publishers: NextPage<{ soundbites?: any }> = ({ soundbites }) => {
  const { data, isValidating } = useSWR(
    "soundbites",
    async () => (await fetchSoundBites()).data,
    { revalidateOnFocus: false, initialData: soundbites }
  );

  return (
    <Layout>
      <Banner>
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
              data?.map((bite: any) => (
                <SoundbiteCard key={bite.id} {...bite} />
              ))
            ) : (
              <p>Loading...</p>
            )}
            <a href="#" className="text-primary lg:text-center lg:col-span-2">
              Show me more →
            </a>
          </div>
        </main>
      </Banner>
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
