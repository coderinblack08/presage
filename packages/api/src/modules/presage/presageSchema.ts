import * as yup from "yup";

const nullType = yup.string().nullable().oneOf([null, undefined]);
export const presageSchema = yup.object().shape({
  type: yup.string().oneOf(["audio", "text"]).required(),
  title: yup.string().when("type", {
    is: "audio",
    then: yup.string().max(100).required(),
    otherwise: nullType,
  }),
  description: yup.string().when("type", {
    is: "audio",
    then: yup.string().max(500).nullable(),
    otherwise: nullType,
  }),
  content: yup.string().when("type", {
    is: "text",
    then: yup.string().max(500).required(),
    otherwise: nullType,
  }),
  parentId: yup.string().nullable(),
});
