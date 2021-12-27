import { Box } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import {
  IconCalendarEvent,
  IconDotsVertical,
  IconExternalLink,
  IconFile,
  IconList,
  IconStar,
  IconX,
} from "@tabler/icons";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { Article } from "../../types";
import { usePublishMutation } from "../drafts/usePublishMutation";
import { FormikAutoSave } from "./FormikAutoSave";
import { TipTapEditor } from "./TipTapEditor";
import { useUpdateDraftMutation } from "./useUpdateDraftMutation";

interface DraftModalProps {
  id: string;
}

export const DraftModal: React.FC<DraftModalProps> = ({ id }) => {
  const [diff, setDiff] = useState<any>(null);
  const { data: draft } = useQuery<Article>(`/articles/${id}`);
  const { mutateAsync } = useUpdateDraftMutation();
  const { mutateAsync: publish, isLoading: isPublishLoading } =
    usePublishMutation();

  return (
    <Modal
      className="p-0 max-w-6xl overflow-y-auto h-[calc(100vh-2rem)] lg:h-[calc(100vh-6rem)] max-h-[64rem]"
      showCloseButton={false}
      trigger={
        <button
          key={draft?.id}
          className="w-full flex items-center space-x-3 px-4 py-2 rounded-xl group"
        >
          <div className="p-1.5 bg-white inline-flex items-center justify-center rounded-xl shadow border">
            <IconFile className="w-[19px] h-[19px] text-gray-400" />
          </div>
          <p className="text-gray-600 truncate text-sm">{draft?.title}</p>
        </button>
      }
    >
      {({ setOpen }) => (
        <>
          <header className="z-50 bg-white sticky top-0 flex items-center justify-between px-4 py-3 border-b">
            <div className="w-full flex items-center space-x-3 rounded-xl">
              <div className="p-1.5 bg-white inline-flex items-center justify-center rounded-xl shadow border">
                <IconFile className="w-[19px] h-[19px] text-gray-400" />
              </div>
              <p className="text-gray-500 truncate max-w-xs">{draft?.title}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button colorScheme="black" size="sm">
                Publish
              </Button>
              <button>
                <IconExternalLink className="text-gray-400 w-6 h-6" />
              </button>
              <button>
                <IconStar className="text-gray-400 w-6 h-6" />
              </button>
              <button>
                <IconDotsVertical className="text-gray-400 w-6 h-6" />
              </button>
              <button onClick={() => setOpen(false)}>
                <IconX className="text-gray-400 w-6 h-6" />
              </button>
            </div>
          </header>
          <main className="pt-24 pb-40 max-w-4xl mx-auto">
            <Formik
              initialValues={{
                title: draft?.title || "",
                editorJSON: draft?.editorJSON || null,
                description: draft?.description || "",
                canonical: draft?.canonical || "",
                tags: (draft?.tags || []).join(", "),
              }}
              onSubmit={async (_, { setFieldError }) => {
                try {
                  await mutateAsync({ id, values: diff, setFieldError });
                } catch (error) {}
              }}
              enableReinitialize
            >
              {({ handleChange, handleBlur, values }) => (
                <Form className="px-8 mx-auto">
                  <h1
                    contentEditable
                    className="focus:outline-none w-full font-bold text-3xl leading-relaxed"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {values.title}
                  </h1>
                  <table className="mt-4">
                    <tr>
                      <th className="flex items-center space-x-1.5 w-24 py-2">
                        <IconCalendarEvent className="text-gray-400 w-5 h-5" />
                        <span className="text-gray-500 font-medium">Date</span>
                      </th>
                      <td className="text-gray-500 py-1">August 23, 2020</td>
                    </tr>
                    <tr>
                      <th className="flex items-center space-x-1.5 w-24 py-2">
                        <IconList className="text-gray-400 w-5 h-5" />
                        <span className="text-gray-500 font-medium">Tags</span>
                      </th>
                      <td className="py-1 space-x-1.5">
                        <div className="inline-flex items-center px-2.5 rounded-md bg-yellow-100 text-yellow-900">
                          Pioneer{" "}
                          <IconX className="w-4 h-4 text-yellow-900/50 ml-2" />
                        </div>
                        <div className="inline-flex items-center px-2.5 rounded-md bg-red-100 text-red-900">
                          Presage{" "}
                          <IconX className="w-4 h-4 text-red-900/50 ml-2" />
                        </div>
                      </td>
                    </tr>
                  </table>
                  <TipTapEditor draft={draft} />
                  <FormikAutoSave setDiff={setDiff} />
                </Form>
              )}
            </Formik>
          </main>
        </>
      )}
    </Modal>
  );
};
