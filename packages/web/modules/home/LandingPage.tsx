import Image from "next/image";
import React from "react";
import { Button } from "../../components/Button";
import illustration from "../../public/static/landing-page-illustration.png";

interface LandingPageProps {}

export const LandingPage: React.FC<LandingPageProps> = ({}) => {
  return (
    <>
      <header className="flex justify-between items-center space-x-8">
        <div>
          <h1 className="h3 lg:h2">
            A Medium alternative built for <br />
            <span className="text-primary h3 lg:h2">
              referral podcasts and blogs
            </span>
          </h1>
          <p className="text-gray-300 mt-3 lg:mt-5 mb-6 lg:mb-8 text-base lg:text-lg max-w-2xl !leading-8">
            <span className="text-gray-100 text-base lg:text-lg">
              Tree steps —
            </span>{" "}
            write, record, publish about anything. Grow your audience
            exponentially with Presage&apos;s referral system.
          </p>
          <div className="flex items-center space-x-3">
            <a href="https://localhost:4000/auth/google">
              <Button size="large">Start Growing</Button>
            </a>
            <Button size="large" color="gray">
              Refer Friend
            </Button>
          </div>
        </div>
        <div className="hidden md:block">
          <Image
            src={illustration}
            alt="Person with microphone"
            placeholder="blur"
          />
        </div>
      </header>
    </>
  );
};
