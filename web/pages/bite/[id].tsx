import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Layout } from "../../layout/Layout";
import { supabase } from "../../lib/supabase";

const Id: React.FC = () => {
  const {
    query: { id },
  } = useRouter();
  const { data, isValidating } = useSWR(
    `soundbite/${id}`,
    async () =>
      (
        await supabase
          .from("soundbites")
          .select("*")
          .filter("id", "eq", id)
          .single()
      ).data
  );
  return <Layout></Layout>;
};

export default Id;
