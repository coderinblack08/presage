import { GetServerSideProps, NextPage } from "next";
import React from "react";
import useSWR from "swr";
import { SoundbiteCard } from "../components/SoundBiteCard";
import { Layout } from "../layout/Layout";
import { supabase } from "../lib/supabase";

const Publishers: NextPage<{ soundbites?: any }> = ({ soundbites }) => {
  const { data, isValidating } = useSWR(
    "soundbites",
    async () => (await supabase.from("soundbites").select("*, users(*)")).data,
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
  const soundbites = await supabase.from("soundbites").select("*, users(*)");
  return {
    props: {
      soundbites: soundbites.data,
    },
  };
};

export default Publishers;
