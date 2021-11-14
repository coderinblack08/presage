import type { NextPage } from "next";
import { Button, Input } from "@presage/ui";
import { Navbar } from "../modules/landing-page/Navbar";
import React from "react";
import { CheckListItem } from "../components/CheckList";

const Home: NextPage = () => {
  return (
    <div
      className="h-screen"
      style={{
        background:
          "linear-gradient(to top left, rgb(225, 251, 244), rgb(248, 250, 255), hsl(323 86.3% 96.5%))",
      }}
    >
      <Navbar />
      <header className="relative z-10 flex flex-col items-center space-y-5 md:space-y-6 text-center py-16 lg:py-20 px-8">
        <h1 className="font-bold font-display text-3xl sm:text-4xl md:text-5xl !leading-normal md:!leading-tight lg:!leading-tight text-purple-500">
          Earn from publishing <br />
          <span className="text-gray-900">Reward your top readers</span>
        </h1>
        <p className="text-gray-500 !leading-loose text-sm sm:text-base md:text-lg max-w-xl md:max-w-2xl">
          <strong className="text-gray-600">Quit Medium & Substack</strong> and
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
