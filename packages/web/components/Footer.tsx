import React from "react";
import { Button } from "./Button";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="flex items-center justify-between py-2 mt-24">
      <div className="flex items-center divide-x divide-gray-200">
        <div className="font-display font-bold text-3xl pr-4">presage</div>
        <p className="text-gray-600 pl-4">©2021 Presage — @joinpresage</p>
      </div>
      <div className="flex items-center space-x-3">
        <Button color="white" size="small">
          <span className="mr-2 small">🐦</span>
          Twitter
        </Button>
        <a href="https://github.com/coderinblack08/presage">
          <Button color="white" size="small">
            <span className="mr-2 small">🐙</span>
            GitHub
          </Button>
        </a>
        <Button color="white" size="small">
          <span className="mr-2 small">🌈</span>
          Instagram
        </Button>
      </div>
    </footer>
  );
};
