import { signIn } from "next-auth/react";
import React from "react";
import { AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai";
import { Button, Modal } from "ui";

interface LoginModalProps {}

export const LoginModal: React.FC<LoginModalProps> = ({}) => {
  return (
    <Modal
      trigger={<button className="text-gray-600">Login</button>}
      title="Login Providers"
    >
      <div className="flex gap-4 flex-col">
        <Button
          variant="outline"
          icon={<AiOutlineGithub size={20} />}
          onClick={() => signIn("github")}
        >
          Login with GitHub
        </Button>
        <Button
          onClick={() => signIn("google")}
          icon={<AiOutlineGoogle size={20} />}
          variant="outline"
        >
          Login with Google
        </Button>
      </div>
    </Modal>
  );
};
