import { Button } from "@presage/ui";
import React from "react";
import { baseURL } from "../../lib/constants";

interface LoginButtonProps {}

export const LoginButton: React.FC<LoginButtonProps> = ({}) => {
  return (
    <a href={`${baseURL}/auth/google`}>
      <Button
        size="sm"
        color="secondary"
        variant="outline"
        className="text-gray-300"
      >
        Login
      </Button>
    </a>
  );
};
