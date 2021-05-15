import * as yup from "yup";

export const registerSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  username: yup
    .string()
    .test({
      name: "whitespace",
      exclusive: false,
      test: (value) =>
        value ? value.split("").every((x) => x !== " ") : false,
    })
    .required(),
});
