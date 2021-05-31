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
      <div className="max-w-3xl mx-auto py-16 md:py-24 px-6">
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
              <RecordAudio />
              <div className="space-y-5 mt-5">
                <InputField name="title" placeholder="Title" />
                <InputField
                  name="description"
                  placeholder="Description"
                  className="h-32"
                  textarea
                />
                <ThumbnailUpload />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                >
                  Publish SoundBite
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default Upload;
