import React from "react";
import { apiBaseURL } from "../../lib/constants";

interface LoginButtonProps {}

export const LoginButton: React.FC<LoginButtonProps> = ({}) => {
  return (
    <a className="text-gray-600" href={`${apiBaseURL}/auth/google`}>
      Login
    </a>
  );
};
