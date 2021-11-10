import { Meta, Story } from "@storybook/react";
import React from "react";
import { Menu, MenuDivider, MenuItem, MenuProps } from "../components/Menu";
import { Button } from "../components/Button";
import { toBoolean } from "../utils/toBoolean";

export default {
  component: Menu,
  title: "Components/Menu",
  argTypes: {
    textarea: toBoolean(),
  },
} as Meta;

const Template: Story<MenuProps> = (args) => (
  <Menu {...args}>
    <MenuItem>Item 1</MenuItem>
    <MenuItem>Item 2</MenuItem>
    <MenuDivider />
    <MenuItem>Item 3</MenuItem>
  </Menu>
);

export const Primary = Template.bind({});

Primary.args = {
  trigger: <Button>Open Menu</Button>,
};
