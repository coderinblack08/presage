import React from "react";
import { Story } from "@storybook/react";
import { Navbar } from "../components/Navbar";

export default {
  title: "Navbar",
  component: Navbar,
};

export const Main: Story = () => <Navbar />;

Main.bind({});
