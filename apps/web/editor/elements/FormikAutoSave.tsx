import { useFormikContext } from "formik";
import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useState } from "react";

export const AutoSave: React.FC = () => {
  const formik = useFormikContext();
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSubmit = useCallback(
    debounce(() => formik.submitForm().then(() => setIsLoading(false)), 500),
    [formik.submitForm, formik.isValid, formik.initialValues, formik.values]
  );

  useEffect(() => {
    if (formik.isValid && formik.dirty) {
      setIsLoading(true);
      debouncedSubmit();
    }
    return debouncedSubmit.cancel;
  }, [debouncedSubmit, formik.dirty, formik.isValid, formik.values]);

  return (
    <span
      className={`${
        isLoading ? "bg-yellow-200/50 text-yellow-500" : "bg-gray-100"
      } px-2 py-0.5 rounded-lg`}
    >
      {isLoading ? "loading..." : "saved"}
    </span>
  );
};
