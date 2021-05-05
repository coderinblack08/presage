import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as yup from "yup";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { InputField } from "../formik/InputField";
import { supabase } from "../lib/supabase";

const Register: React.FC = () => {
  const router = useRouter();

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto py-20 lg:py-28 px-6">
        <h3>Sign In to Presage</h3>
        <p className="text-gray mt-2">
          Discover what’s going on around the globe with Presage
        </p>
        <p className="font-bold text-light-gray mt-6">Enter your Information</p>
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
          initialValues={{ email: "", password: "" }}
          validationSchema={yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().required(),
          })}
          onSubmit={async (values) => {
            const { error } = await supabase.auth.signIn(values);
            if (error) {
              alert(error.message);
            } else {
              const { protocol, host } = window.location;
              window.location.href =
                process.env.NODE_ENV === "production"
                  ? `${protocol}://${host}/`
                  : `http://${host}`;
            }
          }}
        >
          <Form className="grid gap-y-4 mt-10">
            <InputField name="email" placeholder="Email Address" />
            <InputField
              name="password"
              placeholder="Password"
              type="password"
            />
            <Button type="submit" className="w-full mt-2">
              Continue to account
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
