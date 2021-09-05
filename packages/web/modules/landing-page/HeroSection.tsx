import React from "react";
import dashboard from "../../public/static/dashboard.png";
import Image from "next/image";
import { useScreen } from "../../lib/useScreen";
import { ListCheck } from "../../modules/landing-page/ListCheck";
import { Waitlist } from "../../modules/landing-page/Waitlist";
import { Navbar } from "./Navbar";
interface HeroSectionProps {}

export const HeroSection: React.FC<HeroSectionProps> = ({}) => {
  const { isSmallerThanTablet } = useScreen();

  return (
    <header className="relative bg-gray-100">
      <Navbar />
      <header className="relative z-10 flex flex-col items-center max-w-3xl mx-auto pt-8 pb-24 md:pt-16 md:pb-8 px-5">
        <h1 className="font-bold font-display text-3xl sm:text-4xl md:text-5xl xl:text-[3.5rem] text-center !leading-normal md:!leading-snug tracking-[-0.01em]">
          <span className="text-gray-500">Earn from publishing</span> <br />
          Reward your top readers
        </h1>
        <p className="text-gray-500 text-center mt-4 md:mt-6 !leading-loose text-sm sm:text-base lg:text-[1.1rem] max-w-lg sm:max-w-xl lg:max-w-2xl">
          <strong className="text-gray-600">Quit Medium & Substack</strong> and
          publish on Presage. Brainstorm, draft, and revise without
          distractions. Reward your readers for referring your articles.
        </p>
        <Waitlist />
        <ul className="flex items-center justify-between w-full max-w-sm sm:w-auto sm:max-w-none sm:space-x-10 mt-6">
          <li className="flex items-center space-x-2 flex-shrink-0">
            <ListCheck />
            <span className="text-gray-600 font-semibold text-sm">
              {isSmallerThanTablet ? "Free Plan" : "Generous Free Plan"}
            </span>
          </li>
          <li className="flex items-center space-x-2 flex-shrink-0">
            <ListCheck />
            <span className="text-gray-600 font-semibold text-sm">
              {isSmallerThanTablet ? "Referrals" : "Grow with Referrals"}
            </span>
          </li>
          <li className="flex items-center space-x-2 flex-shrink-0">
            <ListCheck />
            <span className="text-gray-600 font-semibold text-sm">
              Open Source
            </span>
          </li>
        </ul>
      </header>
      <div className="hidden md:flex justify-end">
        <Image
          src={dashboard}
          alt="Screenshot of dashboard"
          quality={100}
          priority
        />
      </div>
    </header>
  );
};
