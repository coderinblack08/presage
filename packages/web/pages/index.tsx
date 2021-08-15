import type { NextPage } from "next";
import { AiFillGithub } from "react-icons/ai";
import { FeatureCard } from "../modules/landing-page/FeatureCard";
import { HeroSection } from "../modules/landing-page/HeroSection";
import { Statistic } from "../modules/landing-page/Statistic";

const Home: NextPage = () => {
  return (
    <div className="bg-gray-100">
      <HeroSection />
      <div className="bg-gray-50 overflow-auto shadow-sm px-5">
        <div className="max-w-7xl mx-5 sm:mx-auto grid grid-cols-2 sm:grid-cols-3 grid-border sm:divide-x sm:divide-dashed border-l border-r border-dashed">
          <Statistic statistic="2.8x" description="Increased Revenue" />
          <Statistic statistic="78%" description="Larger Audience" />
          <Statistic statistic="56%" description="More Engagement" />
          <div className="flex sm:hidden justify-center items-center text-gray-500">
            <span className="text-2xl mr-3">🦄</span> And much more!
          </div>
        </div>
      </div>
      <main>
        <div className="max-w-7xl mx-5 lg:mx-auto py-20 px-8 border-l border-r border-dashed">
          <h2 className="font-bold text-3xl md:text-4xl text-gray-900 font-display !leading-snug">
            Sounds Great,
            <br />
            <span className="text-gray-600">But How Does it Work?</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl">
            Our goal is to support independent journalism for everyone without
            prejudice. We also believe in keeping our code open-source for all
            to see (a star never hurts).
          </p>
          <a
            href="https://github.com/coderinblack08/presage"
            className="flex items-center space-x-2 mt-6"
          >
            <AiFillGithub className="w-6 h-6 text-gray-600" />
            <div className="text-gray-600 font-semibold">
              coderinblack / <span className="text-gray-600">presage</span>
            </div>
          </a>
        </div>
        <div className="border-t border-dashed">
          <div className="max-w-7xl mx-5 lg:mx-auto border-l border-r border-dashed">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-dashed divide-y md:divide-y-0 md:divide-x">
              <FeatureCard
                color="purple"
                title="Reward Top Readers"
                description="Incentive readers to refer with rewards. Setup rewards like shoutouts, free swag, and more with rewards."
                time="30 seconds"
                category="Growth"
              />
              <FeatureCard
                color="pink"
                title="Earn Revenue from Writing"
                description="Readers who subscribe to your content pay a monthly or yearly fee to access paywalled content."
                time="1 minute"
                category="Revenue"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
