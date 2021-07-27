import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { MdClose, MdPerson } from "react-icons/md";
import { useMutation } from "react-query";
import { isDev } from "../lib/constants";
import { mutator } from "../lib/mutator";
import { Button } from "./Button";
import { Modal } from "./Modal";

interface LoginButtonProps {}

export const LoginButton: React.FC<LoginButtonProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync } = useMutation(mutator);
  const router = useRouter();

  return (
    <>
      <Button onClick={() => setIsOpen(true)} rounded>
        Login
      </Button>
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 focus:outline-none focus-visible:ring rounded"
        >
          <MdClose className="text-gray-800 w-5 h-5" />
        </button>
        <div className="p-6">
          <h4>Sign In</h4>
          <p className="text-gray-600 mt-1">
            Choose from one of the following providers
          </p>
          <div className="space-y-3 mt-6">
            <a
              onClick={() => umami.trackEvent("Login button clicked", "login")}
              href="http://localhost:4000/auth/google"
            >
              <Button
                icon={<AiOutlineGoogle className="w-5 h-5" />}
                className="w-full"
                color="white"
              >
                Continue with Google
              </Button>
            </a>
            {isDev() ? (
              <Button
                icon={<MdPerson className="w-5 h-5" />}
                className="w-full"
                color="white"
                onClick={async () => {
                  await mutateAsync(["/auth/test-user", {}, "post"], {
                    onSuccess: () => router.push("/redirect"),
                  });
                }}
              >
                Continue with a Test User
              </Button>
            ) : null}
          </div>
        </div>
      </Modal>
    </>
  );
};
