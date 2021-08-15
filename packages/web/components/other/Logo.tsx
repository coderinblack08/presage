import React from "react";
import Image from "next/image";
import logo from "../../public/static/logo.png";

interface LogoProps {
  iconOnly?: boolean;
  small?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  small = false,
  iconOnly = false,
}) => {
  const width = small ? 32 : 36;

  return (
    <div className="flex items-center">
      <Image
        width={width}
        height={(width / 509) * 289}
        src={logo}
        alt="Presage logo"
      />
      {iconOnly || (
        <div
          className={`text-black font-display font-bold ${
            small ? "text-xl" : "text-2xl"
          } -mt-1 ml-3`}
        >
          presage
        </div>
      )}
    </div>
  );
};
