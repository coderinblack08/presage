import React from "react";
import { Story } from "@storybook/react";
import { Button, ButtonProps } from "../components/Button";
import { toBoolean } from "./utils/toBoolean";
import { toEnum } from "./utils/toEnum";

export default {
  title: "Button",
  argTypes: { onClick: { action: "clicked" } },
};

const Template: Story<ButtonProps> = (args) => (
  <Button {...args}>Button</Button>
);

export const Primary = Template.bind({});
export const Gray = Template.bind({});

Gray.args = { color: "gray" };
Primary.argTypes = Gray.argTypes = {
  size: toEnum(["big", "small"]),
  disabled: toBoolean(),
};
