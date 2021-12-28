import { useState } from "react";
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Article } from "../../lib/types";
import { Sidebar } from "../../modules/dashboard/Sidebar";
import {
  IconFile,
  IconExternalLink,
  IconStar,
  IconDotsVertical,
  IconX,
  IconCalendarEvent,
  IconList,
} from "@tabler/icons";
import { Formik, Form } from "formik";
import { Button } from "../../components/Button";
import { FormikAutoSave } from "../../modules/editor/FormikAutoSave";
import { TipTapEditor } from "../../modules/editor/TipTapEditor";
import { defaultMutationFn } from "../../lib/defaultMutationFn";

const Dashboard: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  const [diff, setDiff] = useState<any>(null);
  const { data: draft } = useQuery<Article>(`/articles/${id}`);
  const { mutateAsync } = useMutation(defaultMutationFn);
  const cache = useQueryClient();

  return (
    <div className="flex">
      <Sidebar />
      <main className="h-screen w-full overflow-y-auto">
        <header className="sticky top-0 bg-white z-50 border-b">
          <div className="z-50 flex items-center justify-between px-6 py-3 max-w-6xl mx-auto">
            <div className="w-full flex items-center space-x-3 rounded-xl">
              <div className="p-1.5 bg-white inline-flex items-center justify-center rounded-xl shadow border">
                <IconFile className="w-[19px] h-[19px] text-gray-400" />
              </div>
              <p className="text-gray-500 truncate max-w-xs">{draft?.title}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                size="sm"
                colorScheme="black"
                onClick={async () => {
                  await mutateAsync([`/articles/${id}/publish`, {}, "POST"], {
                    onSuccess: () => {
                      cache.setQueryData<Article>(
                        `/articles/${id}`,
                        (old) =>
                          ({
                            ...old,
                            isPublished: !old?.isPublished,
                          } as Article)
                      );
                    },
                  });
                }}
              >
                {draft?.isPublished ? "Unpublish" : "Publish"}
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
            </div>
          </div>
        </header>
        <div className="pt-24 pb-40 max-w-4xl h-full mx-auto">
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
                if ("tags" in diff) {
                  diff.tags = diff.tags.split(",").map((s) => s.trim());
                  if (diff.tags.length > 5) {
                    setFieldError("tags", "Max of 5 tags");
                    throw new Error();
                  }
                }
                await mutateAsync([`/articles/${id}`, diff, "PATCH"], {
                  onSuccess: ({ id, ...values }) => {
                    cache.setQueryData<Article>(
                      `/articles/${id}`,
                      (old) => ({ ...old, ...values } as any)
                    );
                    if ("title" in values) {
                      cache.setQueryData<Article[]>(
                        `/articles/drafts`,
                        (old) => {
                          return (old || []).map((article) => {
                            if (article.id === id) {
                              return { ...article, ...values };
                            }
                            return article;
                          });
                        }
                      );
                    }
                  },
                });
              } catch (error) {}
            }}
            enableReinitialize
          >
            {({ handleChange, handleBlur, values }) => (
              <Form className="px-8 mx-auto">
                <h1
                  contentEditable
                  suppressContentEditableWarning
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      return false;
                    }
                  }}
                  className="focus:outline-none w-full font-bold text-3xl leading-relaxed"
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {values.title}
                </h1>
                <table className="mt-4">
                  <tbody>
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
                        <div className="inline-flex items-center px-2.5 rounded-md bg-yellow-100 text-yellow-900 space-x-2">
                          <span>Pioneer</span>
                          <button>
                            <IconX className="w-4 h-4 text-yellow-900/50" />
                          </button>
                        </div>
                        <div className="inline-flex items-center px-2.5 rounded-md bg-red-100 text-red-900 space-x-2">
                          <span>Presage</span>
                          <button>
                            <IconX className="w-4 h-4 text-red-900/50" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <hr className="mt-10 border-gray-100" />
                <TipTapEditor draft={draft} />
                <FormikAutoSave setDiff={setDiff} />
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      id: ctx.query.id,
    },
  };
};

export default Dashboard;
