import React from "react";
import { Meta } from "@storybook/react";
import { Navbar } from "../modules/landing-page/Navbar";

export default {
  title: "Navigation/Navbar",
  component: Navbar,
} as Meta;

export const Primary = () => <Navbar />;