import React from "react";
import useSWR from "swr";
import { SoundbiteCard } from "../components/SoundBiteCard";
import { Layout } from "../layout/Layout";
import { supabase } from "../lib/supabase";

const Publishers: React.FC = () => {
  const { data, isValidating } = useSWR(
    "soundbites",
    async () => (await supabase.from("soundbites").select("*")).data
  );

  return (
    <Layout>
      {!isValidating ? (
        data?.map((bite) => <SoundbiteCard />)
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
};

export default Publishers;
