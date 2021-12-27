import React from "react";
import Image from "next/image";
import logo from "../../public/static/logo.svg";

interface PresageLogoProps {}

export const PresageLogo: React.FC<PresageLogoProps> = ({}) => {
  return (
    <div className="flex items-center select-none">
      <Image src={logo} alt="Presage logo" />
    </div>
  );
};
