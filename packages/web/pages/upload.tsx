import { RadioGroup } from "@headlessui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "../components/Button";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { mutator } from "../lib/mutator";
import { TypeRadioOption } from "../modules/upload/TypeRadioOption";
import { Presage } from "../types";

const Upload: React.FC = () => {
  const [type, setType] = useState<Presage["type"] | null>(null);
  const { mutateAsync } = useMutation(mutator);
  const length = (s: string) => s.trim().length;
  const queryClient = useQueryClient();

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
              const body = { ...values, type };
              await mutateAsync(["/api/presage", body, "POST"], {
                onSuccess: (data) => {
                  queryClient.setQueryData<Presage[]>("/api/presage", (old) => [
                    { ...data, user: queryClient.getQueryData("/api/me") },
                    ...(old ? old : []),
                  ]);
                },
              });
            }}
          >
            {({ values, isSubmitting }) => (
              <Form className="mt-8">
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
                <Button className="mt-5 w-full" loading={isSubmitting}>
                  Publish Presage
                </Button>
              </Form>
            )}
          </Formik>
        ) : type === "audio" ? (
          <div></div>
        ) : null}
      </main>
    </Layout>
  );
};

export default Upload;
