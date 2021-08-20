import * as yup from "yup";

export const rewardSchema = yup.object().shape({
  name: yup.string().max(20).min(5).required(),
  description: yup.string().max(100).min(10).required(),
  link: yup
    .string()
    .url("link must be a valid url, don't forget http!")
    .nullable(),
  type: yup.string().oneOf(["shoutout", "link"]).required(),
  points: yup
    .number()
    .typeError("points must be a number")
    .min(0)
    .max(1000)
    .required(),
});
