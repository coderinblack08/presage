import { FolderAddIcon, XIcon } from "@heroicons/react/solid";
import { Form, Formik } from "formik";
import "rc-slider/assets/index.css";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import * as yup from "yup";
import { RecordAudio } from "../audio/RecordAudio";
import { Button } from "../components/Button";
import { InputField } from "../formik/InputField";
import { Layout } from "../layout/Layout";
import { supabase } from "../lib/supabase";
import { useUser } from "../stores/auth";

const Upload: React.FC = () => {
  const { user } = useUser();
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  return (
    <Layout title="Upload SoundBite">
      <Formik
        initialValues={{ description: "" }}
        onSubmit={async (values: any) => {
          const body = { ...values };
          if (thumbnail) {
            const filePath = `${user.id}-${Math.random()}-${thumbnail.name}`;
            const { data, error } = await supabase.storage
              .from("thumbnails")
              .upload(filePath, thumbnail);
            if (error) {
              throw error;
            }
            console.log(data);
            body.thumbnail = filePath;
          }
          console.log(body);
        }}
        validationSchema={yup.object().shape({
          description: yup.string().min(20).max(500),
        })}
      >
        {() => (
          <Form>
            <RecordAudio />
            <InputField
              name="description"
              placeholder="SoundBite Description"
              className="mt-10 h-32"
              textarea
            />
            <Dropzone
              onDrop={async ([file]) => setThumbnail(file)}
              multiple={false}
              accept="image/*"
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center mt-3 py-8 px-12 w-full rounded-lg border border-darker-gray bg-darkest-gray">
                      <FolderAddIcon className="mb-2 w-12 h-12 text-primary" />
                      {thumbnail && (
                        <p className="text-light-gray">{thumbnail.name}</p>
                      )}
                      <p className={`text-gray ${thumbnail ? "small" : ""}`}>
                        Pick or drag and drop a {thumbnail ? "new " : ""}
                        thumbnail
                      </p>
                    </div>
                  </div>
                  {thumbnail && (
                    <Button
                      type="button"
                      color="secondary"
                      size="small"
                      className="mt-5"
                      icon={<XIcon className="w-4 h-4" />}
                      onClick={() => setThumbnail(null)}
                    >
                      Clear Thumbnail
                    </Button>
                  )}
                </section>
              )}
            </Dropzone>
            <Button type="submit" className="w-full mt-5">
              Publish SoundBite
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Upload;
