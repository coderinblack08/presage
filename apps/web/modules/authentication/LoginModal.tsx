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
          size="lg"
          variant="outline"
          icon={<AiOutlineGithub size={20} />}
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
        >
          Login with GitHub
        </Button>
        <Button
          size="lg"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          icon={<AiOutlineGoogle size={20} />}
          variant="outline"
        >
          Login with Google
        </Button>
      </div>
    </Modal>
  );
};
