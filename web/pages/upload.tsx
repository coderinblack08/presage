import { FolderAddIcon, XIcon } from "@heroicons/react/solid";
import axios from "axios";
import FormData from "form-data";
import byteSize from "byte-size";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import "rc-slider/assets/index.css";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { v4 } from "uuid";
import * as yup from "yup";
import { RecordAudio } from "../audio/RecordAudio";
import { Button } from "../components/Button";
import { InputField } from "../formik/InputField";
import { Layout } from "../layout/Layout";
import { supabase } from "../lib/supabase";
import { useUser } from "../stores/auth";

const Upload: React.FC = () => {
  const { user } = useUser();
  const [audio, setAudio] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const router = useRouter();

  return (
    <Layout title="Upload SoundBite">
      <Formik
        initialValues={{ description: "", title: "" }}
        onSubmit={async (values: any) => {
          if (audio === "") {
            alert("Please record a SoundBite");
            return;
          }

          const id = v4();
          const audioFile = await fetch(audio)
            .then((r) => r.blob())
            .then(
              (blobFile) => new File([blobFile], id, { type: "audio/mp3" })
            );

          const audioPath = `${user.id}-${id}`;
          const body = { ...values, audio: audioPath, id, user_id: user.id };
          const { error } = await supabase.storage
            .from("soundbites")
            .upload(audioPath, audioFile);
          if (error) {
            throw error;
          }
          if (thumbnail) {
            const filePath = `${user.id}-${id}-${thumbnail.name}`;
            const formData = new FormData();
            formData.append("image", thumbnail);

            await axios.post(
              `http://localhost:3000/api/image?w=400&h=400&bucket=thumbnails&path=${filePath}`,
              formData,
              {
                headers: {
                  "content-type": "multipart/form-data",
                },
              }
            );
            body.thumbnail = filePath;
          }
          const { error: err } = await supabase.from("soundbites").insert(body);
          if (err) {
            throw err;
          }
          router.push("/soundbites");
        }}
        validationSchema={yup.object().shape({
          description: yup.string().min(20).max(500),
          title: yup.string().max(256).required(),
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <RecordAudio setAudio={setAudio} />
            <InputField
              name="title"
              placeholder="SoundBite Title"
              className="mt-10"
            />
            <InputField
              name="description"
              placeholder="SoundBite Description"
              className="mt-4 h-32"
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
                        <p className="text-light-gray">
                          {thumbnail.name} {byteSize(thumbnail.size).toString()}
                        </p>
                      )}
                      <p className={`text-gray ${thumbnail ? "small" : ""}`}>
                        Pick or drag and drop a {thumbnail ? "new " : ""}
                        thumbnail — 1MB Max
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
            <Button
              type="submit"
              className="w-full mt-5"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              Publish SoundBite
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Upload;
