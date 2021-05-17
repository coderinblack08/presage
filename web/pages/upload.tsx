import { Form, Formik } from "formik";
import React from "react";
import { Button } from "../components/Button";
import { InputField } from "../formik/InputField";
import { Layout } from "../layout/Layout";
import { RecordAudio } from "../modules/upload/RecordAudio";
import { ThumbnailUpload } from "../modules/upload/ThumbnailUpload";
import { uploadSchema } from "../modules/upload/UploadSchema";
import { useUploadSoundbite } from "../modules/upload/useUploadSoundbite";

const Upload: React.FC = () => {
  const { setAudio, thumbnail, setThumbnail, upload } = useUploadSoundbite();

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-32">
        <Formik
          initialValues={{ description: "", title: "" }}
          onSubmit={async (values) => {
            await upload(values);
          }}
          validationSchema={uploadSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <h4 className="mb-5 text-white">Upload Soundbite</h4>
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
              <ThumbnailUpload
                thumbnail={thumbnail}
                setThumbnail={setThumbnail}
              />
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
      </div>
    </Layout>
  );
};

export default Upload;
