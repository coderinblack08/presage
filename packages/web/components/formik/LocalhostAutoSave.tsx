import { useFormikContext } from "formik";
import debounce from "lodash.debounce";
import React, { useEffect, useMemo } from "react";

interface LocalhostAutoSaveProps {
  storageKey: string;
}

export const LocalhostAutoSave: React.FC<LocalhostAutoSaveProps> = ({
  storageKey,
}) => {
  const formik = useFormikContext<any>();

  const debouncedSubmit = useMemo(
    () =>
      debounce(() => {
        if (!formik.dirty) {
          return false;
        }
        window.localStorage.setItem(
          "autosave-" + storageKey,
          JSON.stringify(formik.values)
        );
      }, 300),
    [formik.dirty, formik.values, storageKey]
  );

  useEffect(() => {
    debouncedSubmit();
    return debouncedSubmit.cancel;
  }, [debouncedSubmit, formik.values]);

  return null;
};
