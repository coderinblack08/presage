import { Button, Modal } from "ui";
import React from "react";
import { AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai";

interface LoginModalProps {}

export const LoginModal: React.FC<LoginModalProps> = ({}) => {
  return (
    <Modal trigger={<button className="text-gray-600">Login</button>}>
      <div className="flex gap-4 flex-col">
        <Button variant="outline" icon={<AiOutlineGithub size={20} />}>
          Login with GitHub
        </Button>
        <Button icon={<AiOutlineGoogle size={20} />} variant="outline">
          Login with Google
        </Button>
      </div>
    </Modal>
  );
};
