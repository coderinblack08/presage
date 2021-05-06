import {
  FolderAddIcon,
  MicrophoneIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/solid";
import { Form, Formik } from "formik";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Button } from "../components/Button";
import { Select } from "../components/Select";
import { InputField } from "../formik/InputField";
import { Layout } from "../layout/Layout";
import { supabase } from "../lib/supabase";
import { useDevices } from "../lib/useDevices";
import * as yup from "yup";
import { useUser } from "../stores/auth";

const Upload: React.FC = () => {
  const { devices } = useDevices();
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
            <div className="flex items-center justify-between">
              <h4>Record</h4>
              {devices.length ? (
                <Select
                  defaultValue={devices[0].label}
                  items={devices.map((x) => x.label)}
                />
              ) : null}
            </div>
            <div className="flex items-center space-x-6 w-full mt-4">
              <button className="p-4 rounded-full bg-primary hover:bg-faint-primary">
                <MicrophoneIcon className="text-white w-6 h-6" />
              </button>
              <div className="flex-grow">
                <div className="w-full">
                  <Slider
                    min={0}
                    max={300}
                    value={21.51}
                    railStyle={{ backgroundColor: "#282F42" }}
                    trackStyle={{ backgroundColor: "#E4E7F1" }}
                    handleStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "none",
                    }}
                  />
                </div>
                <div className="relative flex items-center w-full">
                  <p className="absolute left-0 font-bold">00:21.51</p>
                  <div className="flex items-center justify-center space-x-2 w-full">
                    <button>
                      <img
                        src="/icons/replay10.svg"
                        alt="Replay 10 Seconds"
                        className="text-white w-8 h-8"
                      />
                    </button>
                    <button>
                      <img
                        src="/icons/play.svg"
                        alt="Play"
                        className="text-white w-12 h-12"
                      />
                    </button>
                    <button>
                      <img
                        src="/icons/forward10.svg"
                        alt="Forward 10 Seconds"
                        className="text-white w-8 h-8"
                      />
                    </button>
                    <button>
                      <TrashIcon className="w-8 h-8 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p className="small text-gray mt-2">
              Or upload an{" "}
              <a href="#" className="text-primary small">
                audio file
              </a>{" "}
              · 5 minute limit
            </p>
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
