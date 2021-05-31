import { useSoundbiteQuery } from "@presage/gql";
import { Form, Formik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Banner } from "../../components/Banner";
import { Button } from "../../components/Button";
import { SoundbiteCard } from "../../components/SoundBiteCard";
import { InputField } from "../../formik/InputField";
import { Layout } from "../../layout/Layout";
import { URLSafeString } from "../../lib/URLSafeString";

const Bite: React.FC = () => {
  const {
    query: { id },
  } = useRouter();
  const { data, loading } = useSoundbiteQuery({
    variables: { id: URLSafeString(id) },
  });

  return (
    <Layout>
      <Head>
        <title>{data?.getSoundbite.title}</title>
      </Head>
      <Banner>
        <div className="max-w-2xl mx-auto py-12 px-6">
          {!loading && data?.getSoundbite ? (
            <SoundbiteCard {...data?.getSoundbite} expanded />
          ) : null}
          {/* <h6 className="font-bold mt-12">Recommended Soundbites</h6> */}
        </div>
      </Banner>
      <main className="py-20 max-w-2xl mx-auto px-6">
        <h6 className="font-bold">Comment (0)</h6>
        <Formik
          initialValues={{ body: "" }}
          onSubmit={async (values, { resetForm }) => {
            // const {
            //   data: [data],
            // } = await supabase.from("comments").insert({
            //   ...values,
            //   soundbite_id: id,
            //   user_id: user.id,
            // });
            // data.profiles = profile;
            // mutate(["comments", id], [data, ...comments], false);
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
        {/* <div className="space-y-8 mt-10">
          {comments?.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </div> */}
      </main>
    </Layout>
  );
};

export default Bite;
