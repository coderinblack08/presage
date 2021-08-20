import React, { useCallback, useEffect } from "react";
import { useFormikContext } from "formik";
import { debounce } from "lodash";

export const AutoSave: React.FC = () => {
  const formik = useFormikContext();

  const debouncedSubmit = useCallback(
    debounce(() => {
      if (!formik.isValid || !formik.dirty) return false;
      return formik.submitForm();
    }, 1000),
    [formik.submitForm, formik.isValid, formik.initialValues, formik.values]
  );

  useEffect(() => {
    debouncedSubmit();
    return debouncedSubmit.cancel;
  }, [debouncedSubmit, formik.values]);

  return null;
};
