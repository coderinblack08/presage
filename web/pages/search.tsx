import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Layout } from "../layout/Layout";
import { supabase } from "../lib/supabase";
import { URLSafeString } from "../lib/URLSafeString";

const Search: React.FC = () => {
  const {
    query: { q },
  } = useRouter();
  const { data: soundbites } = useSWR(
    ["soundbites_query", q],
    async () =>
      (
        await supabase
          .from("soundbites")
          .select("*")
          .textSearch("title", URLSafeString(q), {
            config: "english",
            type: "plain",
          })
      ).data
  );

  return (
    <Layout>
      <pre>{JSON.stringify(soundbites, null, 2)}</pre>
    </Layout>
  );
};

export default Search;
