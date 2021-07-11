import React from "react";
import illustration from "../../public/static/reading-under-tree.png";
import philosophy from "../../public/static/philosophy.svg";
import Image from "next/image";
import { Button } from "../../components/Button";
import { FeatureCard } from "./FeatureCard";
import { EmojiIcon } from "./EmojiIcon";
import { Footer } from "../../components/Footer";

interface LandingPageProps {}

export const LandingPage: React.FC<LandingPageProps> = ({}) => {
  return (
    <div>
      <header className="mt-6 md:mt-0 flex justify-between items-center">
        <div className="max-w-lg lg:max-w-2xl w-full">
          <h1 className="text-2xl sm:h3 lg:h2 font-display font-extrabold">
            A Medium alternative built for <br />
            <span className="text-2xl sm:h3 lg:h2 text-gray-500 font-extrabold font-display">
              referral podcasts and blogs
            </span>
          </h1>
          <p className="text-gray-600 font-display mt-4 !leading-[1.8] text-[13px] sm:text-base">
            <strong className="text-gray-900">Tree steps</strong> — write,
            record, publish about anything. Grow your audience exponentially
            with Presage&apos;s referral system.
          </p>
          <div className="flex items-center space-x-3 mt-8">
            <Button>Get Started</Button>
            <Button color="white">Contact Sales</Button>
          </div>
        </div>
        <div className="hidden md:block">
          <Image
            src={illustration}
            alt="Man reading under tree"
            width={1971 / 5.8}
            height={1984 / 5.8}
            placeholder="blur"
          />
        </div>
      </header>
      <div className="relative">
        <section className="mt-20 md:mt-36">
          <EmojiIcon emoji="🔌" />
          <p className="font-display font-bold">Our Features</p>
          <h3 className="h4 md:h3 font-display">Comes Battery Packed</h3>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 max-w-5xl">
            <FeatureCard
              title="Feature Rich editor"
              description="Built into presage is an editor with a wide range of features (text formatting, markdown, equations, syntax highlighting, etc.), many of which Medium doesn't offer."
            />
            <FeatureCard
              title="For Story-Tellers &amp; Bloggers"
              description="Presage was designed to be a place to document and share your stories, studies, and more."
            />
            <FeatureCard
              title="Talk to your Community"
              description="We put community first, allowing for discussions, referrals, and upvotes."
            />
            <FeatureCard
              title="Grow Exponentially with Referrals"
              description="Referrals have proven to be an effective way for startups to grow. Why don't we do the same for publishers?"
            />
          </div>
        </section>
        <div className="hidden md:block absolute right-0 top-0 mr-12 z-0">
          <Image
            width={184 / 1.1}
            height={573 / 1.1}
            src={philosophy}
            alt="Philosophy Text Scroll"
          />
        </div>
      </div>
      <section className="mt-20 md:mt-36">
        <EmojiIcon emoji="📈" />
        <h3 className="font-display text-gray-600">
          Engage Readers Like <br />{" "}
          <span className="h3 text-gray-900">You’ve Never Done Before</span>
        </h3>
        <p className="text-gray-600 mt-2">
          With these stats, think about how much bigger you can be!
        </p>
        <div className="grid max-w-3xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 mt-10">
          <article>
            <h4>200%</h4>
            <p className="text-gray-600">More Retention</p>
          </article>
          <article>
            <h4>75%</h4>
            <p className="text-gray-600">More Revenue</p>
          </article>
          <article>
            <h4>450%</h4>
            <p className="text-gray-600">More Growth with Referrals</p>
          </article>
        </div>
      </section>
      <Footer />
    </div>
  );
};
