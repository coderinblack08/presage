import Image from "next/image";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { Navbar } from "../../components/navigation/Navbar";
import { ListCheck } from "../../modules/landing-page/ListCheck";
import { Waitlist } from "../../modules/landing-page/Waitlist";
import globe from "../../public/static/globe.png";
interface HeroSectionProps {}

export const HeroSection: React.FC<HeroSectionProps> = ({}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 640px)" });

  return (
    <header className="relative h-[40rem] sm:h-[48rem] md:h-screen max-h-[64rem] lg:min-h-[56rem] bg-gray-100">
      <Navbar />
      <header className="relative z-10 flex flex-col items-center max-w-3xl mx-auto py-10 md:py-16 px-5">
        <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center !leading-snug">
          <span className="text-gray-500">Earn from publishing</span> <br />
          Reward your top readers
        </h1>
        <p className="text-gray-500 text-center mt-4 md:mt-6 !leading-loose text-sm sm:text-base md:text-[1.1rem] max-w-lg md:max-w-2xl">
          <strong className="text-gray-600">Quit Medium & Substack</strong> and
          publish on Presage. Brainstorm, draft, and revise without
          distractions. Reward your readers for referring your articles.
        </p>
        <Waitlist />
        <ul className="flex items-center space-x-10 mt-6">
          <li className="flex items-center space-x-2">
            <ListCheck />
            <span className="text-gray-600 font-semibold text-sm">
              {isTabletOrMobile ? "Free Plan" : "Generous Free Plan"}
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <ListCheck />
            <span className="text-gray-600 font-semibold text-sm">
              {isTabletOrMobile ? "Referrals" : "Grow with Referrals"}
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <ListCheck />
            <span className="text-gray-600 font-semibold text-sm">
              Open Source
            </span>
          </li>
        </ul>
      </header>
      {/* <div
        className="pt-16 md:pt-32 w-screen flex items-center absolute z-0 bottom-0"
        style={{
          background: "linear-gradient(180deg, #F3F4F6 0%, #AFB4BD 100%)",
        }}
      >
        <div className="flex justify-end px-5 md:px-16 lg:px-10 max-w-7xl mx-auto">
          <Image
            src={globe}
            alt="Paper airplanes orbiting globe"
            quality={100}
            priority
          />
        </div>
      </div> */}
    </header>
  );
};
