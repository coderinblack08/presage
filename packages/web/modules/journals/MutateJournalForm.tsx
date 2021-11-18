import { EmojiSelect, Button } from "@presage/ui";
import { IconFolderPlus } from "@tabler/icons";
import { Formik, Form, FormikHelpers } from "formik";
import React from "react";
import { InputField } from "../../components/InputField";

interface Values {
  name: string;
  description: string;
  icon: string;
}

interface MutateJournalFormProps {
  initialValues?: Partial<Values>;
  action: (
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ) => void | Promise<any>;
  close: () => void;
}

export const MutateJournalForm: React.FC<MutateJournalFormProps> = ({
  action,
  initialValues,
  close,
}) => {
  return (
    <Formik
      initialValues={{ name: "", description: "", icon: "" } || initialValues}
      onSubmit={action}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className="space-y-3 mt-4">
          <div className="flex items-center space-x-3">
            <div className="w-auto inline-block">
              <EmojiSelect
                setExternal={(emoji) => setFieldValue("icon", emoji, false)}
              />
            </div>
            <InputField name="name" placeholder="Name" />
          </div>
          <InputField name="description" placeholder="Description" textarea />
          <div className="flex items-center space-x-2">
            <Button
              type="submit"
              icon={<IconFolderPlus size={20} className="text-purple-300" />}
            >
              Submit
            </Button>
            <Button
              loading={isSubmitting}
              onClick={close}
              type="button"
              color="secondary"
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
