import { RadioGroup } from "@headlessui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { serialize } from "object-to-formdata";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import create from "zustand";
import { Button } from "../components/Button";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { mutator } from "../lib/mutator";
import { AudioRecorder } from "../modules/upload/AudioRecorder";
import { TypeRadioOption } from "../modules/upload/TypeRadioOption";
import { Presage } from "../types";

export const useAudioUpload = create<{
  audio: Blob | null;
  setAudio: (audio: Blob) => void;
}>((set) => ({
  audio: null,
  setAudio: (audio: Blob) => set({ audio }),
}));

const Upload: React.FC = () => {
  const [type, setType] = useState<Presage["type"] | null>(null);
  const { mutateAsync } = useMutation(mutator);
  const length = (s: string) => s.trim().length;
  const audio = useAudioUpload((x) => x.audio);
  const queryClient = useQueryClient();
  const router = useRouter();

  const createPresage = async (body: {
    [key: string]: string | File | Blob;
  }) => {
    await mutateAsync(["/api/presage", serialize(body), "POST"], {
      onSuccess: (data) => {
        queryClient.setQueryData<Presage[]>("/api/presage", (old) => [
          { ...data, user: queryClient.getQueryData("/api/me") },
          ...(old ? old : []),
        ]);
      },
    });
    router.push("/");
  };

  return (
    <Layout>
      <main className="max-w-2xl mx-auto">
        <h4 className="mb-5">Choose an Upload Type</h4>
        <RadioGroup value={type} onChange={setType} className="space-y-4">
          <TypeRadioOption
            value="audio"
            heading="Audio Presage"
            description="Great for podcasts and audio-centric content"
          />
          <TypeRadioOption
            value="text"
            heading="Text Presage"
            description="Similar to tweets, text and images only"
          />
        </RadioGroup>
        {type === "text" ? (
          <Formik
            initialValues={{
              content: "",
            }}
            onSubmit={async (values) => {
              await createPresage({ ...values, type });
            }}
          >
            {({ values, isSubmitting }) => (
              <Form className="mt-10">
                <InputField
                  name="content"
                  placeholder="Message"
                  className="h-32"
                  textarea
                />
                <p className="text-gray-300 mt-2">
                  <span
                    className={
                      length(values.content) > 500
                        ? "text-[#EF4444]"
                        : "text-gray-200"
                    }
                  >
                    {length(values.content)} / 500
                  </span>{" "}
                  characters used
                </p>
                <Button
                  type="submit"
                  className="mt-5 w-full"
                  loading={isSubmitting}
                >
                  Publish Presage
                </Button>
              </Form>
            )}
          </Formik>
        ) : type === "audio" ? (
          <div className="mt-10">
            <AudioRecorder />
            <Formik
              initialValues={{ title: "", description: "" }}
              onSubmit={async (values) => {
                createPresage({ ...values, type, audio });
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-5">
                  <InputField name="title" placeholder="Title" />
                  <InputField
                    name="description"
                    placeholder="Description"
                    className="h-32"
                    textarea
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    loading={isSubmitting}
                  >
                    Publish Presage
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        ) : null}
      </main>
    </Layout>
  );
};

export default Upload;
