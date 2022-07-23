import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const AutoSave: React.FC = () => {
  const formik = useFormikContext();
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSubmit = useDebouncedCallback(
    () =>
      formik.submitForm().then(() => {
        setIsLoading(false);
      }),
    1000
  );

  useEffect(() => {
    if (formik.isValid && formik.dirty) {
      setIsLoading(true);
      debouncedSubmit();
    }
  }, [debouncedSubmit, formik.dirty, formik.isValid, formik.values]);

  // return (
  //   <span
  //     className={`${
  //       isLoading ? "bg-yellow-200/50 text-yellow-500" : "bg-gray-100"
  //     } px-2 py-0.5 rounded-lg`}
  //   >
  //     {isLoading ? "loading..." : "saved"}
  //   </span>
  // );
  return null;
};
