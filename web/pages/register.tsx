import { CheckCircleIcon } from "@heroicons/react/outline";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Button } from "../components/Button";
import { InputField } from "../formik/InputField";
import { Layout } from "../layout/Layout";
import { register, registerSchema } from "../modules/register";

const Register: React.FC = () => {
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-20 lg:py-28">
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
            <p className="font-bold text-light-gray mt-8">
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
              onSubmit={async (values) => {
                const worked = await register(values);
                if (worked) {
                  setShowConfirmEmail(true);
                }
              }}
              validationSchema={registerSchema}
            >
              {({ isSubmitting }) => (
                <Form className="grid gap-y-4 mt-10">
                  <div className="grid items-start gap-x-4 grid-cols-[3fr,2fr] w-full">
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
                    className="w-full"
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
    </Layout>
  );
};

export default Register;
