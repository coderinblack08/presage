import React from "react";
import { Button } from "./Button";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:items-center justify-between py-4 mt-16 sm:mt-32">
      <div className="flex flex-col sm:flex-row sm:items-center divide-x divide-gray-200">
        <div className="font-display font-bold text-3xl sm:pr-3 leading-none">
          presage
        </div>
        <p className="text-gray-600 sm:pl-3 mt-2 sm:mt-0">©2021 Presage Inc.</p>
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
