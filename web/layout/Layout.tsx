import React from "react";
import {
  SoundbiteHeader,
  SoundbiteHeaderProps,
} from "../components/SoundBiteHeader";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps & SoundbiteHeaderProps> = ({
  children,
  ...props
}) => {
  return (
    <div>
      <SoundbiteHeader {...props} />
      <div className="max-w-4xl w-full mx-auto px-6">
        <main className="py-12">{children}</main>
      </div>
    </div>
  );
};
