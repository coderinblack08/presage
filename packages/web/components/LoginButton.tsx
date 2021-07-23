import React from "react";
import { Button } from "./Button";

interface LoginButtonProps {}

export const LoginButton: React.FC<LoginButtonProps> = ({}) => {
  return (
    <a
      onClick={() => {
        umami.trackEvent("Login button clicked", "login");
      }}
      href="http://localhost:4000/auth/google"
    >
      <Button rounded>Login</Button>
    </a>
  );
};
