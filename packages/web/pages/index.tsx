import type { NextPage } from "next";
import { Button, Input } from "@presage/ui";
import { Navbar } from "../modules/landing-page/Navbar";
import React from "react";
import { CheckListItem } from "../components/CheckList";

const Home: NextPage = () => {
  return (
    <div className="h-screen bg-gray-100">
      {/* <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 15% 50%, rgb(237, 233, 254), rgba(255, 255, 255, 0) 25%), radial-gradient(circle at 85% 30%, rgb(216, 243, 246), rgba(255, 255, 255, 0) 25%)",
        }}
      /> */}
      <Navbar />
      <header className="relative z-10 flex flex-col items-center space-y-5 md:space-y-6 text-center py-16 lg:py-20 px-8">
        <h1 className="font-bold font-display text-3xl sm:text-4xl md:text-5xl xl:text-[3.25rem] !leading-normal md:!leading-[1.4] lg:!leading-[1.4] text-gray-500">
          Earn from publishing <br />
          <span className="text-gray-900">Reward your top readers</span>
        </h1>
        <p className="text-gray-500 !leading-loose text-[0.9rem] sm:text-base lg:text-[1.1rem] max-w-xl md:max-w-2xl">
          <strong className="text-gray-600">Quit Medium & Substack</strong> and
          publish on Presage. Brainstorm, draft, and revise without
          distractions. Reward your readers for referring your articles.
        </p>
        <form className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 max-w-xl md:max-w-[40rem] w-full mt-4 sm:mt-6">
          <Input placeholder="Enter your email..." type="email" />
          <Button
            size="lg"
            color="secondary"
            className="w-full sm:w-auto flex-shrink-0"
          >
            Join Waitlist
          </Button>
        </form>
        <ul className="flex items-center justify-between w-full max-w-xl sm:space-x-10">
          <CheckListItem>Generous Free Plan</CheckListItem>
          <CheckListItem>Grow with Referrals</CheckListItem>
          <CheckListItem>Open Source</CheckListItem>
        </ul>
      </header>
    </div>
  );
};

export default Home;
