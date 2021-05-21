import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Banner } from "../../components/Banner";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { SoundbiteCard } from "../../components/SoundBiteCard";
import { Layout } from "../../layout/Layout";
import { supabase } from "../../lib/supabase";

async function fetchSoundbite(id: string | string[]) {
  return (
    await supabase
      .from("soundbites")
      .select("*, profiles:userId(*)")
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
        <div className="max-w-2xl mx-auto py-12 px-6">
          <SoundbiteCard {...data} expanded />
          {/* <h6 className="font-bold mt-12">Recommended Soundbites</h6> */}
        </div>
      </Banner>
      <main className="py-20 max-w-2xl mx-auto px-6">
        <h6 className="font-bold">Comment (0)</h6>
        <div className="flex items-center space-x-2 my-2">
          <Input placeholder="Message" />
          <Button>Reply</Button>
        </div>
        <p className="small text-gray">
          Or reply with another{" "}
          <Link href="/upload">
            <a className="link small">Soundbite</a>
          </Link>
        </p>
      </main>
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
