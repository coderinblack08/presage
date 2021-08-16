import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { FeatureCard } from "./FeatureCard";
import { HeroSection } from "./HeroSection";
import { Statistic } from "./Statistic";
import bird from "../../public/static/animals/bird.png";
import rabbit from "../../public/static/animals/rabbit.png";
import rat from "../../public/static/animals/rat.png";
import walrus from "../../public/static/animals/walrus.png";

export const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <HeroSection />
      <div className="bg-gray-50 overflow-auto shadow-sm px-5">
        <div className="max-w-7xl sm:mx-auto grid grid-cols-2 sm:grid-cols-3 not-sm-grid-border sm:divide-x sm:divide-dashed border-l border-r border-dashed">
          <Statistic statistic="2.8x" description="Increased Revenue" />
          <Statistic statistic="78%" description="Larger Audience" />
          <Statistic statistic="56%" description="More Engagement" />
          <div className="flex sm:hidden justify-center items-center text-gray-500">
            <span className="text-2xl mr-3">🦄</span> And much more!
          </div>
        </div>
      </div>
      <main>
        <div className="px-5">
          <div className="max-w-7xl mx-auto py-20 px-8 border-l border-r border-dashed">
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
              className="inline-flex items-center space-x-2 mt-6"
            >
              <AiFillGithub className="w-6 h-6 text-gray-600" />
              <div className="text-gray-600 font-semibold">
                coderinblack / <span className="text-gray-900">presage</span>
              </div>
            </a>
          </div>
        </div>
        <div className="border-t border-dashed px-5">
          <div className="max-w-7xl mx-auto border-l border-r border-dashed">
            <div className="grid grid-cols-1 md:grid-cols-2 feature-grid">
              <FeatureCard
                animal={rabbit}
                color="purple"
                title="Reward Top Readers"
                description="Incentive readers to refer with rewards. Setup rewards like shoutouts, free swag, and more with rewards."
                time="30 seconds"
                category="Growth"
              />
              <FeatureCard
                animal={bird}
                color="pink"
                title="Earn Revenue from Writing"
                description="Readers who subscribe to your content pay a monthly or yearly fee to access pay-walled content."
                time="1 minute"
                category="Revenue"
              />
              <FeatureCard
                animal={walrus}
                color="red"
                title="Sponsor Marketplace"
                description="Get sponsored and paid for the content you create. Match with sponsors on Presage’s marketplace."
                time="1 minute"
                wip
                category="Revenue"
              />
              <FeatureCard
                animal={rat}
                color="yellow"
                title="Post Anywhere with our API"
                description="Use our public API to host your content on your own website while having access to the vast variety of features Presage offers."
                time="2 minute"
                category="Revenue"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
