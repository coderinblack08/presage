import { Form, Formik } from "formik";
import React from "react";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { InputField } from "../formik/InputField";
import { supabase } from "../lib/supabase";

const Register: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto py-20 lg:py-28 px-6">
        <h3>Sign Up for Presage</h3>
        <p className="text-gray mt-2">
          Discover what’s going on around the globe with Presage
        </p>
        <p className="font-bold text-light-gray mt-6">Enter your Information</p>
        <p className="text-gray small">
          By signing in, you accept our{" "}
          <a href="#" className="small">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="small">
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
              await supabase.from("users").insert({ id: user.id, username });
            }
          }}
        >
          <Form className="grid gap-y-4 mt-10">
            <div
              className="grid items-center gap-x-4 w-full"
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
            <Button type="submit" className="w-full mt-4">
              Create your account
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
