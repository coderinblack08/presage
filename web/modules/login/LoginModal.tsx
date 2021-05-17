import { Dialog } from "@headlessui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { InputField } from "../../formik/InputField";
import { supabase } from "../../lib/supabase";
import { loginSchema } from "./LoginSchema";

interface LoginModalProps {}

export const LoginModal: React.FC<LoginModalProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <>
      <Button color="secondary" onClick={() => setOpen(true)}>
        Login
      </Button>
      <Modal setOpen={setOpen} open={open} className="py-10 px-8 max-w-xl">
        {showConfirmation ? (
          <div className="flex flex-col items-center">
            <svg
              className="w-12 h-12 mb-6"
              viewBox="0 0 57 57"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M47.5 9.5H9.5C6.8875 9.5 4.77375 11.6375 4.77375 14.25L4.75 42.75C4.75 45.3625 6.8875 47.5 9.5 47.5H47.5C50.1125 47.5 52.25 45.3625 52.25 42.75V14.25C52.25 11.6375 50.1125 9.5 47.5 9.5ZM47.5 19L28.5 30.875L9.5 19V14.25L28.5 26.125L47.5 14.25V19Z"
                  fill="white"
                />
                <rect
                  x="39.7812"
                  y="40.0187"
                  width="13.0625"
                  height="7.8375"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M46.3124 54.3874C49.084 54.3874 51.742 53.2864 53.7017 51.3267C55.6615 49.3669 56.7624 46.7089 56.7624 43.9374C56.7624 41.1659 55.6615 38.5079 53.7017 36.5482C51.742 34.5884 49.084 33.4874 46.3124 33.4874C43.5409 33.4874 40.8829 34.5884 38.9232 36.5482C36.9634 38.5079 35.8624 41.1659 35.8624 43.9374C35.8624 46.7089 36.9634 49.3669 38.9232 51.3267C40.8829 53.2864 43.5409 54.3874 46.3124 54.3874ZM51.1547 42.2484C51.3927 42.0021 51.5243 41.6721 51.5213 41.3296C51.5184 40.9871 51.381 40.6595 51.1388 40.4173C50.8966 40.1751 50.569 40.0378 50.2265 40.0348C49.884 40.0318 49.554 40.1635 49.3077 40.4014L45.0062 44.7029L43.3172 43.0139C43.0708 42.776 42.7409 42.6443 42.3984 42.6473C42.0559 42.6503 41.7283 42.7876 41.4861 43.0298C41.2439 43.272 41.1065 43.5996 41.1035 43.9421C41.1006 44.2846 41.2322 44.6146 41.4702 44.8609L44.0827 47.4734C44.3276 47.7183 44.6598 47.8559 45.0062 47.8559C45.3526 47.8559 45.6848 47.7183 45.9297 47.4734L51.1547 42.2484Z"
                  fill="#547CF5"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="57" height="57" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <Dialog.Title as="h4" className="text-xl font-bold text-center">
              We've sent you an login email
            </Dialog.Title>
            <p className="mt-2 text-gray text-center">
              We’ve sent your email a link to log into your account. You may
              close this tab after you're done.
            </p>
          </div>
        ) : (
          <>
            <Dialog.Title as="h4" className="text-xl font-bold">
              Sign in to Presage
            </Dialog.Title>
            <Formik
              initialValues={{ email: "" }}
              onSubmit={async ({ email }) => {
                const { error } = await supabase.auth.signIn({ email });

                if (error) {
                  console.error(error);
                } else {
                  setShowConfirmation(true);
                }
              }}
              validationSchema={loginSchema}
            >
              {({ isSubmitting }) => (
                <Form className="flex items-start space-x-2 mt-4 mb-2">
                  <InputField placeholder="Email Address" name="email" />
                  <Button type="submit" loading={isSubmitting}>
                    Continue
                  </Button>
                </Form>
              )}
            </Formik>
            <label className="small text-gray">
              By logging in, you agree to the{" "}
              <a className="small link">Terms of Service</a>.
            </label>
          </>
        )}
      </Modal>
    </>
  );
};
