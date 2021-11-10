import { Meta, Story } from "@storybook/react";
import React from "react";
import { Input, InputProps } from "../components/Input";
import { toBoolean } from "../utils/toBoolean";

export default {
  component: Input,
  title: "Components/Input",
  argTypes: {
    textarea: toBoolean(),
  },
} as Meta;

const Template: Story<InputProps> = (args) => (
  <Input placeholder="placeholder..." {...args} />
);

export const Primary = Template.bind({});

Primary.args = {};
