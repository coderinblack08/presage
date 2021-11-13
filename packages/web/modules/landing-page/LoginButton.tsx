import { Button } from "@presage/ui";
import React from "react";
import { apiBaseURL } from "../../lib/constants";

interface LoginButtonProps {}

export const LoginButton: React.FC<LoginButtonProps> = ({}) => {
  return (
    <a href={`${apiBaseURL}/auth/google`}>
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
