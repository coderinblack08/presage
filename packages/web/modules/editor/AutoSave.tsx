import { useFormikContext } from "formik";
import debounce from "lodash.debounce";
import isEqual from "lodash.isequal";
import { useEffect, useMemo, useRef } from "react";

const AutoSave: React.FC<{}> = ({}) => {
  const formik = useFormikContext();
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
        previous.current = formik.values;
        return formik.submitForm();
      }, 800),
    [formik, previous]
  );

  useEffect(() => {
    debouncedSubmit();
    return debouncedSubmit.cancel;
  }, [debouncedSubmit, formik.values]);

  return null;
};

export default AutoSave;
