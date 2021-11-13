import type { NextPage } from "next";
import { Button, Input } from "@presage/ui";
import { Navbar } from "../modules/landing-page/Navbar";
import React from "react";
import { CheckListItem } from "../components/CheckList";

const RadialGradient = () => {
  return (
    <div className="absolute top-0 flex justify-center w-full">
      <svg
        className="max-w-2xl lg:max-w-4xl w-full"
        viewBox="0 0 1003 499"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1003 5.71675e-05C1003 132.343 950.164 259.266 856.114 352.846C762.065 446.427 634.506 499 501.5 499C368.494 499 240.935 446.427 146.886 352.846C52.8365 259.266 2.59248e-05 132.343 1.74112e-05 3.05176e-05L501.5 1.33249e-05L1003 5.71675e-05Z"
          fill="url(#paint0_radial_5_80)"
          fillOpacity="0.5"
        />
        <defs>
          <radialGradient
            id="paint0_radial_5_80"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(501.5) rotate(90) scale(499 501.5)"
          >
            <stop stopColor="#2B205A" stopOpacity="0.75" />
            <stop offset="1" stopColor="#3B2F70" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div>
      <RadialGradient />
      <Navbar />
      <header className="relative z-10 flex flex-col items-center space-y-5 md:space-y-6 text-center py-16 lg:py-24 px-8">
        <h1 className="font-bold font-display text-3xl sm:text-4xl md:text-5xl !leading-normal md:!leading-tight lg:!leading-tight text-purple-500">
          Earn from publishing <br />
          <span className="text-purple-200">Reward your top readers</span>
        </h1>
        <p className="text-gray-500 !leading-loose text-sm sm:text-base md:text-lg max-w-xl md:max-w-2xl">
          <strong className="text-gray-400">Quit Medium & Substack</strong> and
          publish on Presage. Brainstorm, draft, and revise without
          distractions. Reward your readers for referring your articles.
        </p>
        <form className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 max-w-[40rem] w-full mt-4 sm:mt-6">
          <Input placeholder="Enter your email..." type="email" />
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto flex-shrink-0"
          >
            Join Waitlist
          </Button>
        </form>
        <ul className="flex items-center justify-between w-full sm:max-w-xl sm:space-x-10">
          <CheckListItem>Generous Free Plan</CheckListItem>
          <CheckListItem>Grow with Referrals</CheckListItem>
          <CheckListItem>Open Source</CheckListItem>
        </ul>
      </header>
    </div>
  );
};

export default Home;
