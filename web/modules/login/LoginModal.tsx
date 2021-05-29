import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";

interface LoginModalProps {}

export const LoginModal: React.FC<LoginModalProps> = ({}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button color="secondary" onClick={() => setOpen(true)}>
        Login
      </Button>
      <Modal setOpen={setOpen} open={open} className="py-10 px-8 max-w-xl">
        <Dialog.Title as="h4" className="text-xl font-bold">
          Sign in to Presage
        </Dialog.Title>
        <div className="mt-4 mb-2">
          <a href="http://localhost:4000/api/auth/google">
            <Button className="w-full" color="secondary" icon={<FaGoogle />}>
              Continue with Google
            </Button>
          </a>
        </div>
        <p className="small text-gray">
          By logging in, you agree to the{" "}
          <a className="small link">Terms of Service</a>.
        </p>
      </Modal>
    </>
  );
};
