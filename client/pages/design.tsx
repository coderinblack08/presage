import { IconLogout, IconMenu, IconMenu2, IconUser } from "@tabler/icons";
import { NextPage } from "next";
import React from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Menu, MenuItem } from "../components/Menu";
import { Modal } from "../components/Modal";
import { Select } from "../components/Select";

const DesignPage: NextPage = () => {
  return (
    <div className="max-w-3xl py-16 md:py-20 mx-auto px-5">
      <svg
        className="w-16 h-16 mb-4 -ml-1"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" fill="white" />
        <path
          d="M13.2355 16.542L12.5449 12.0147L3.33687 15.4294C3.17062 15.4741 2.84195 15.648 2.8573 15.9857C2.87265 16.3233 3.2316 16.4868 3.39175 16.4868L13.2355 16.542Z"
          fill="#AAABAD"
        />
        <path
          d="M25.1259 35.645C24.9402 35.4162 25.1765 34.9991 25.3312 34.8407L44.3793 12.3251C44.4659 12.2124 44.5745 12.035 44.8526 12.1069C45.1308 12.1788 45.1586 12.478 45.1378 12.6186C44.0522 19.9738 41.8163 34.8774 41.7457 35.3782C41.6751 35.8791 41.1688 35.969 41.0324 35.9633L25.7417 35.9851C25.6067 35.9671 25.3116 35.8739 25.1259 35.645Z"
          fill="url(#paint0_linear_56_2)"
        />
        <path
          d="M15.6576 34.9723L12.5323 12.0192C12.5323 12.0192 12.8839 11.9528 13.4581 12.3317C14.0323 12.7106 41.5036 34.5737 41.5036 34.5737C41.6625 34.7047 41.8692 35.077 41.7198 35.484C41.5704 35.8911 41.1913 35.9763 40.9836 35.9723C33.2818 35.9766 17.3448 35.9853 16.6356 35.9853C15.9265 35.9853 15.6982 35.31 15.6576 34.9723Z"
          fill="url(#paint1_linear_56_2)"
        />
        <path
          d="M15.901 35.645C15.7153 35.4162 15.9516 34.9991 16.1063 34.8407L35.1544 12.3251C35.241 12.2124 35.3496 12.035 35.6277 12.1069C35.9058 12.1788 35.9337 12.478 35.9129 12.6186C34.8272 19.9738 32.6891 34.875 32.6185 35.3759C32.5478 35.8768 32.2573 35.9907 32.1208 35.9851H16.5168C16.3818 35.9671 16.0867 35.8739 15.901 35.645Z"
          fill="url(#paint2_linear_56_2)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_56_2"
            x1="35.1026"
            y1="12.0903"
            x2="35.1026"
            y2="35.9853"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#CFD0D1" />
            <stop offset="1" stopColor="#D2D3D5" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_56_2"
            x1="14.5218"
            y1="15.031"
            x2="38.9597"
            y2="35.9853"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#8B8B8B" />
            <stop offset="1" stopColor="#9A9999" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_56_2"
            x1="25.8777"
            y1="12.0903"
            x2="25.8777"
            y2="35.9853"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9A9B9D" />
            <stop offset="1" stopColor="#C8C8C8" />
          </linearGradient>
        </defs>
      </svg>
      <h1 className="text-3xl font-bold mb-3">Design System</h1>
      <p className="text-gray-500">
        Presage&apos;s design system, crafted by{" "}
        <a className="px-2 py-0.5 font-medium text-purple-500 bg-purple-500/10 rounded-md">
          @coderinblack
        </a>
      </p>
      <hr className="my-8" />
      <h2 className="mb-4 text-lg font-bold">Buttons</h2>
      <div className="flex items-start space-x-2">
        <Button size="xs">Button</Button>
        <Button size="sm">Button</Button>
        <Button size="md">Button</Button>
        <Button size="lg">Button</Button>
      </div>
      <div className="flex items-start space-x-2 mt-2">
        <Button colorScheme="white" size="xs">
          Button
        </Button>
        <Button colorScheme="white" size="sm">
          Button
        </Button>
        <Button colorScheme="white" size="md">
          Button
        </Button>
        <Button colorScheme="white" size="lg">
          Button
        </Button>
      </div>
      <div className="flex items-start space-x-2 mt-2">
        <Button colorScheme="purple" size="xs">
          Button
        </Button>
        <Button colorScheme="purple" size="sm">
          Button
        </Button>
        <Button colorScheme="purple" size="md">
          Button
        </Button>
        <Button colorScheme="purple" size="lg">
          Button
        </Button>
      </div>
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-bold">Inputs</h2>
        <div className="grid gap-4">
          <Input placeholder="Enter text here..." />
          <Input
            placeholder="Enter description here..."
            className="h-32"
            isTextarea
          />
          <Select className="w-full">
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </Select>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-bold">Overlays</h2>
        <div className="flex items-center space-x-2">
          <Menu
            trigger={
              <Button icon={<IconMenu2 className="w-5 h-5" />}>
                Open Menu
              </Button>
            }
            align="center"
          >
            <MenuItem icon={<IconUser className="w-5 h-5" />}>Profile</MenuItem>
            <MenuItem icon={<IconLogout className="w-5 h-5" />}>
              Logout
            </MenuItem>
          </Menu>
          <Modal trigger={<Button colorScheme="purple">Open Modal</Button>}>
            <div>hi</div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default DesignPage;
