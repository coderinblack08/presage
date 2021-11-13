import { Button } from "@presage/ui";
import React from "react";

interface LoginButtonProps {}

export const LoginButton: React.FC<LoginButtonProps> = ({}) => {
  return (
    <Button
      size="sm"
      color="secondary"
      variant="outline"
      className="text-gray-300"
    >
      Login
    </Button>
  );
};
