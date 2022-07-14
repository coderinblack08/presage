import React from "react";
import { Meta, Story } from "@storybook/react";
import { Button, ButtonProps } from "../components/Button";
import { toBoolean } from "../utils/toBoolean";
import { toEnum } from "../utils/toEnum";

export default {
  component: Button,
  title: "Components/Button",
  argTypes: {
    color: toEnum(["primary", "purple"]),
    size: toEnum(["sm", "md", "lg"]),
    loading: toBoolean(),
    disabled: toBoolean(),
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <Button {...args}>Button</Button>
);

export const Primary = Template.bind({});

Primary.args = {};
