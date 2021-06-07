import React from "react";

interface LogoProps {}

export const Logo: React.FC<LogoProps> = ({}) => {
  return (
    <div className="flex items-center space-x-3.5">
      <img src="/static/logo.png" />
      <div className="font-body text-2xl font-bold">Presage</div>
    </div>
  );
};
