import { GetServerSideProps, NextPage } from "next";
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
      <div className="space-y-16">
        {!isValidating ? (
          data?.map((bite) => <SoundbiteCard {...bite} />)
        ) : (
          <p>Loading...</p>
        )}
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
