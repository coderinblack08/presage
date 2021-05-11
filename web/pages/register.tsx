import { CheckCircleIcon } from "@heroicons/react/outline";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { InputField } from "../formik/InputField";
import { supabase } from "../lib/supabase";

const Register: React.FC = () => {
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);
  return (
    <div className="max-w-3xl mx-auto py-20 lg:py-28 px-6">
      {showConfirmEmail ? (
        <>
          <div className="flex items-center">
            <h3>Verify your Email</h3>
            <CheckCircleIcon className="w-8 h-8 ml-3 text-primary" />
          </div>
          <p className="text-gray mt-2">
            Check your inbox for a confirmation email{" "}
            <span className="text-light">(sometimes it's in spam).</span>
          </p>
        </>
      ) : (
        <>
          <h3>Sign Up for Presage</h3>
          <p className="text-gray mt-2">
            Discover what’s going on around the globe with Presage
          </p>
          <p className="font-bold text-light-gray mt-6">
            Enter your Information
          </p>
          <p className="text-gray small">
            By signing in, you accept our{" "}
            <a href="#" className="small link">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="small link">
              Terms of Service
            </a>
            .
          </p>
          <Formik
            initialValues={{ email: "", username: "", password: "" }}
            onSubmit={async ({ email, password, username }) => {
              const { error, user } = await supabase.auth.signUp({
                email,
                password,
              });
              if (error) {
                alert(error.message);
              } else {
                console.log(user);
                await supabase.auth.update({ data: { username } });
                await supabase
                  .from("users")
                  .insert({ id: user.id, username, email });
                setShowConfirmEmail(true);
              }
            }}
            validationSchema={yup.object().shape({
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
            })}
          >
            {({ isSubmitting }) => (
              <Form className="grid gap-y-4 mt-10">
                <div
                  className="grid items-start gap-x-4 w-full"
                  style={{ gridTemplateColumns: "3fr 2fr" }}
                >
                  <InputField name="email" placeholder="Email Address" />
                  <InputField name="username" placeholder="Username" />
                </div>
                <InputField
                  name="password"
                  placeholder="Password"
                  type="password"
                />
                <Button
                  type="submit"
                  className="w-full mt-2"
                  disabled={isSubmitting}
                >
                  Create your account
                </Button>
              </Form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

export default Register;
