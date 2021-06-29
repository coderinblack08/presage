import Image from "next/image";
import React from "react";
import { Button } from "../components/Button";
import { Layout } from "../components/Layout";
import illustration from "../public/landing-page-illustration.png";

const Index: React.FC = () => {
  return (
    <Layout>
      <header className="flex justify-between items-center space-x-8">
        <div>
          <h1 className="h3 lg:h2">
            A Medium alternative built for <br />
            <span className="text-primary h3 lg:h2">
              referral podcasts and blogs
            </span>
          </h1>
          <p className="text-gray-300 mt-3 lg:mt-5 mb-6 lg:mb-8 text-base lg:text-lg leading-relaxed max-w-2xl">
            <span className="text-gray-100 text-base lg:text-lg">
              Tree steps —
            </span>{" "}
            write, record, publish about anything. Grow your audience
            exponentially with Presage&apos;s referral system.
          </p>
          <Button size="large">Start Growing</Button>
        </div>
        <div className="hidden md:block">
          <Image
            src={illustration}
            alt="Person with microphone"
            placeholder="blur"
          />
        </div>
      </header>
    </Layout>
  );
};

export default Index;
