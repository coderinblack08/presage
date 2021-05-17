import * as yup from "yup";

export const uploadSchema = yup.object().shape({
  description: yup.string().min(20).max(500),
  title: yup.string().max(256).required(),
});
