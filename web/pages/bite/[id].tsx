import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Banner } from "../../components/Banner";
import { SoundbiteCard } from "../../components/SoundBiteCard";
import { Layout } from "../../layout/Layout";
import { supabase } from "../../lib/supabase";

async function fetchSoundbite(id: string | string[]) {
  return (
    await supabase
      .from("soundbites")
      .select("*, profiles(*)")
      .filter("id", "eq", typeof id === "string" ? id : id[0])
      .single()
  ).data;
}

const Id: React.FC<{ soundbite?: any }> = ({ soundbite }) => {
  const {
    query: { id },
  } = useRouter();
  const { data } = useSWR(
    ["soundbite", id],
    async () => await fetchSoundbite(id),
    {
      initialData: soundbite,
    }
  );

  return (
    <Layout>
      <Banner>
        <div className="max-w-3xl mx-auto py-16">
          <SoundbiteCard {...data} expanded />
          <h6 className="font-bold mt-12">Recommended Soundbites</h6>
        </div>
      </Banner>
      <main className="py-20 max-w-3xl mx-auto"></main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { id },
}) => {
  return {
    props: {
      soundbite: await fetchSoundbite(id),
    },
  };
};

export default Id;
