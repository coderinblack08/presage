import { motion, useTransform, useViewportScroll } from "framer-motion";
import Image from "next/image";
import React from "react";
import { useScreen } from "../../lib/useScreen";
import { ListCheck } from "../../modules/landing-page/ListCheck";
import { Waitlist } from "../../modules/landing-page/Waitlist";
import dashboard from "../../public/static/dashboard.png";
import { Navbar } from "./Navbar";
interface HeroSectionProps {}

export const HeroSection: React.FC<HeroSectionProps> = ({}) => {
  const { isSmallerThanTablet } = useScreen();
  const { scrollY } = useViewportScroll();
  const rotateX = useTransform(scrollY, [0, 500], [15, 0]);
  const scale = useTransform(scrollY, [0, 500], [1.1, 1.2]);

  const headerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const headerRow = {
    hidden: { opacity: 0, y: -12 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <header className="relative bg-gray-100">
      <motion.div
        transition={{ duration: 0.1 }}
        variants={headerRow}
        initial="hidden"
        animate="show"
      >
        <Navbar />
      </motion.div>
      <motion.header
        variants={headerContainer}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.1 }}
        className="relative z-10 flex flex-col items-center max-w-3xl mx-auto pt-8 pb-24 md:pt-16 md:pb-32 px-5"
      >
        <motion.h1
          variants={headerRow}
          className="font-bold font-display text-3xl sm:text-4xl md:text-5xl xl:text-[3.5rem] text-center !leading-normal md:!leading-snug tracking-[-0.01em]"
        >
          <span className="text-gray-500">Earn from publishing</span> <br />
          Reward your top readers
        </motion.h1>
        <motion.p
          variants={headerRow}
          className="text-gray-500 text-center mt-4 md:mt-6 !leading-loose text-sm sm:text-base lg:text-[1.1rem] max-w-lg sm:max-w-xl lg:max-w-2xl"
        >
          <strong className="text-gray-600">Quit Medium & Substack</strong> and
          publish on Presage. Brainstorm, draft, and revise without
          distractions. Reward your readers for referring your articles.
        </motion.p>
        <motion.div className="flex justify-center w-full" variants={headerRow}>
          <Waitlist />
        </motion.div>
        <motion.ul
          variants={headerRow}
          className="flex items-center justify-between w-full max-w-sm sm:w-auto sm:max-w-none sm:space-x-10 mt-6"
        >
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
        </motion.ul>
      </motion.header>
      <div className="relative z-10 hidden md:flex justify-end md:w-5/6 lg:w-3/4 max-w-6xl mx-auto">
        <motion.div style={{ rotateX, scale, transformPerspective: 1000 }}>
          <Image
            src={dashboard}
            alt="Screenshot of dashboard"
            quality={100}
            placeholder="blur"
            priority
          />
        </motion.div>
      </div>
      <div className="hidden md:block absolute bottom-0 z-0 h-96 w-full bg-gradient-to-b from-gray-100 to-gray-300" />
    </header>
  );
};
