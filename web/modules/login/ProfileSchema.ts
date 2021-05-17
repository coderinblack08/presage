import * as yup from "yup";

export const profileSchema = yup.object().shape({
  username: yup.string().max(100).required(),
  displayName: yup.string().max(100),
  bio: yup.string().max(500),
});
