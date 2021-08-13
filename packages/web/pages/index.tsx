import type { NextPage } from "next";
import Image from "next/image";
import { Navbar } from "../components/navigation/Navbar";
import { ListCheck } from "../modules/landing-page/ListCheck";
import globe from "../public/static/globe.png";

const Home: NextPage = () => {
  return (
    <header className="relative w-screen h-[36rem] md:h-screen max-h-[72rem] bg-gray-100">
      <Navbar />
      <header className="relative z-10 flex flex-col items-center max-w-3xl mx-auto py-8 md:py-16 px-5">
        <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center !leading-snug">
          <span className="text-gray-500">Earn from publishing</span> <br />
          Reward your top readers
        </h1>
        <p className="text-gray-500 text-center mt-4 md:mt-8 !leading-loose text-sm sm:text-base md:text-[1.1rem] max-w-xl md:max-w-2xl">
          <strong className="text-gray-600">Quit Medium & Substack</strong> and
          publish on Presage. Brainstrom, draft, and revise without
          distractions. Reward your readers for refering your articles.
        </p>
        <div className="flex items-center space-x-3 max-w-xl w-full mt-6">
          <input
            type="text"
            placeholder="Enter your email..."
            className="w-full px-5 py-2.5 rounded-lg shadow"
          />
          <button className="px-8 py-2.5 shadow rounded-lg bg-gray-900 text-white font-bold flex-shrink-0">
            Join Waitlist
          </button>
        </div>
        <ul className="flex items-center space-x-10 mt-6">
          <li className="flex items-center space-x-2">
            <ListCheck />
            <span className="text-gray-600 font-semibold text-sm">
              Generous Free Plan
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <ListCheck />
            <span className="text-gray-600 font-semibold text-sm">
              Grow with Referrals
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
      <div
        className="pt-32 w-screen flex items-center absolute z-0 bottom-0"
        style={{
          background: "linear-gradient(180deg, #F3F4F6 0%, #BABEC6 100%)",
        }}
      >
        <div className="px-5 md:px-16 lg:px-36 mx-auto">
          <Image
            src={globe}
            alt="Paper airplanes orbiting globe"
            quality={100}
            priority
          />
        </div>
      </div>
    </header>
  );
};

export default Home;
