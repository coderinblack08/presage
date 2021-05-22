import { Form, Formik } from "formik";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useSWR, { mutate } from "swr";
import { Banner } from "../../components/Banner";
import { Button } from "../../components/Button";
import { Comment } from "../../components/Comment";
import { SoundbiteCard } from "../../components/SoundBiteCard";
import { InputField } from "../../formik/InputField";
import { Layout } from "../../layout/Layout";
import { supabase } from "../../lib/supabase";
import { useUser } from "../../stores/auth";

async function fetchSoundbite(id: string | string[]) {
  return (
    await supabase
      .from("soundbites")
      .select("*, profiles:userId(*)")
      .filter("id", "eq", typeof id === "string" ? id : id[0])
      .single()
  ).data;
}

async function fetchComments(_, id: string | string[]) {
  return (
    await supabase
      .from("comments")
      .select("*, profiles:user_id(*)")
      .eq("soundbite_id", typeof id === "string" ? id : id[0])
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
  const { data: comments } = useSWR(["comments", id], fetchComments);
  const { user, profile } = useUser();

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
        <Formik
          initialValues={{ body: "" }}
          onSubmit={async (values, { resetForm }) => {
            const {
              data: [data],
            } = await supabase.from("comments").insert({
              ...values,
              soundbite_id: id,
              user_id: user.id,
            });
            data.profiles = profile;
            mutate(["comments", id], [data, ...comments], false);
            resetForm({});
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex items-center space-x-2 my-2">
              <InputField placeholder="Message" name="body" />
              <Button type="submit" loading={isSubmitting}>
                Reply
              </Button>
            </Form>
          )}
        </Formik>
        <p className="small text-gray">
          Or reply with another{" "}
          <Link href={`/upload?reply_to=${id}`}>
            <a className="link small">Soundbite</a>
          </Link>
        </p>
        <div className="space-y-8 mt-10">
          {comments?.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </div>
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
