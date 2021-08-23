import { useFormikContext } from "formik";
import debounce from "lodash.debounce";
import isEqual from "lodash.isequal";
import { useEffect, useMemo, useRef } from "react";
import { difference } from "../../lib/diffObjects";

const AutoSave: React.FC<{
  setDiff: (diff: object) => void;
}> = ({ setDiff }) => {
  const formik = useFormikContext<any>();
  const previous = useRef<any>(null);

  const debouncedSubmit = useMemo(
    () =>
      debounce(() => {
        if (
          !formik.isValid ||
          !formik.dirty ||
          isEqual(previous.current, formik.values)
        ) {
          return false;
        }
        const diff: any = difference(
          formik.values,
          previous.current || formik.initialValues
        );
        if ("editorJSON" in diff) diff.editorJSON = formik.values.editorJSON;
        setDiff(diff);

        previous.current = formik.values;

        return formik.submitForm();
      }, 300),
    [formik, previous, setDiff]
  );

  useEffect(() => {
    debouncedSubmit();
    return debouncedSubmit.cancel;
  }, [debouncedSubmit, formik.values]);

  return null;
};

export default AutoSave;
