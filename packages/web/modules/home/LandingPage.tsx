import React from "react";
import illustration from "../../public/static/phone-illustration.png";
import featureGraphic from "../../public/static/feature-graphic.png";
import philosophy from "../../public/static/philosophy.svg";
import Image from "next/image";
import { Button } from "../../components/Button";
import { FeatureCard } from "./FeatureCard";
import { EmojiIcon } from "./EmojiIcon";
import { Footer } from "../../components/Footer";
import { useMediaQuery } from "react-responsive";
import { Navbar } from "../../components/Navbar";
import { MdCheck } from "react-icons/md";
import { Input } from "../../components/Input";
import { Waitlist } from "./Waitlist";

interface LandingPageProps {}

function ItemCheck() {
  return (
    <div className="mt-1 flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300 rounded-full p-1">
      <MdCheck className="w-4 h-4" />
    </div>
  );
}

export const LandingPage: React.FC<LandingPageProps> = ({}) => {
  const isTabletOrDesktop = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <div>
      <Navbar />
      <div className="py-4 md:py-0 px-5 md:px-8 max-w-8xl mx-auto">
        <header className="mt-10 md:mt-0 flex justify-between items-center md:py-8">
          <div className="max-w-lg lg:max-w-2xl w-full">
            <h1 className="text-3xl leading-normal sm:h3 lg:h2 font-display font-bold">
              A Medium alternative built for <br />
              <span className="text-3xl leading-normal sm:h3 lg:h2 text-gray-500 font-bold font-display">
                referral podcasts and blogs
              </span>
            </h1>
            <p className="text-gray-600 font-display mt-4 !leading-[1.8] text-[13px] sm:text-base">
              <strong className="text-gray-900">Three steps</strong> — write,
              record, publish about anything. Grow your audience exponentially
              with Presage&apos;s referral system.
            </p>
            <Waitlist />
          </div>
          <div className="hidden md:block">
            <Image
              src={illustration}
              alt="Phone in hand"
              quality={100}
              width={317 * (isTabletOrDesktop ? 0.75 : 1)}
              height={393 * (isTabletOrDesktop ? 0.75 : 1)}
              placeholder="blur"
              priority
            />
          </div>
        </header>
      </div>
      <div className="relative px-5 md:px-8 max-w-8xl mx-auto" id="main">
        <section className="mt-20 md:mt-28">
          <EmojiIcon emoji="🔌" />
          <p className="font-display font-bold">Our Features</p>
          <h3 className="h4 md:h3 font-display">Comes Battery Packed</h3>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 max-w-5xl">
            <FeatureCard
              title="Feature Rich Editor"
              description="Built into presage is an editor with a wide range of features (text formatting, markdown, equations, syntax highlighting, etc.), many of which Medium doesn't offer."
            />
            <FeatureCard
              title="For Story-Tellers &amp; Bloggers"
              description="Presage was designed to be a place to document and share your stories, studies, and more."
            />
            <FeatureCard
              title="Talk To Your Community"
              description="We put community first, allowing for discussions, referrals, and upvotes."
            />
            <FeatureCard
              title="Grow Exponentially With Referrals"
              description="Referrals have proven to be an effective way for startups to grow. Why don't we do the same for publishers?"
            />
          </div>
        </section>
        <div className="hidden md:block absolute right-0 top-0 mr-8 z-0">
          <Image
            width={285}
            height={603}
            src={philosophy}
            alt="Philosophy Text Scroll"
          />
        </div>
      </div>
      <section className="border-t border-b border-gray-200 relative z-10 mt-20 md:mt-36 bg-white py-24 px-5 md:px-8">
        <svg
          className="absolute z-0 bottom-0 right-0 h-5/6"
          viewBox="0 0 892 630"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M892 630.33H892.33V630V2V1.36216L891.809 1.73018L2.80939 629.73L1.95978 630.33H3H892Z"
            fill="url(#paint0_radial)"
            fillOpacity="0.25"
            stroke="url(#paint1_radial)"
            strokeWidth="0.660713"
          />
          <defs>
            <radialGradient
              id="paint0_radial"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(476.629 316.183) rotate(90) scale(313.817 416.015)"
            >
              <stop stopColor="#D1D5DB" />
              <stop offset="1" stopColor="#D1D5DB" stopOpacity="0.17" />
            </radialGradient>
            <radialGradient
              id="paint1_radial"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(476.629 335.03) rotate(90) scale(294.97 416.015)"
            >
              <stop stopColor="#9CA3AF" stopOpacity="0.32" />
              <stop offset="1" stopColor="#9CA3AF" stopOpacity="0.18" />
            </radialGradient>
          </defs>
        </svg>

        <div className="flex items-center justify-between space-x-10 max-w-8xl mx-auto">
          <div className="max-w-full lg:max-w-xl xl:max-w-2xl">
            <h3 className="h4 md:h3 text-gray-900 font-display">
              Sounds Great,
              <br />
              <div className="text-gray-600 h4 md:h3">But How Do You Work?</div>
            </h3>
            <p className="text-gray-600 mt-2">
              We’re built by 3 main components, see how these work for yourself.
            </p>
            <ul className="mt-12 space-y-10">
              <li className="flex space-x-6 items-start">
                <ItemCheck />
                <div className="space-y-1 md:space-y-2">
                  <h4 className="text-lg md:h4 font-display">Publish</h4>
                  <p className="text-gray-700 font-normal">
                    Write content in a simplistic, feature rich editor, free of
                    distractions. View your analytics to improve your user
                    engagement.
                  </p>
                </div>
              </li>
              <li className="flex space-x-6 items-start">
                <ItemCheck />
                <div className="space-y-1 md:space-y-2">
                  <h4 className="text-lg md:h4 font-display">
                    Referrals and Rewards
                  </h4>
                  <p className="text-gray-700 font-normal">
                    Refer articles to your friend, recieve rewards which you can
                    spend on premium features such as unlocking paywalled
                    content, unlock subscriptions to your favorite creators, and
                    creating publications.
                  </p>
                </div>
              </li>
              <li className="flex space-x-6 items-start">
                <ItemCheck />
                <div className="space-y-1 md:space-y-2">
                  <h4 className="text-lg md:h4 font-display">
                    Reading and Conversing
                  </h4>
                  <p className="text-gray-700 font-normal">
                    Read, like, donate, refer, and comment on articles you love
                    with no distractions. Subscribe to your favorite creators to
                    get premium content.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="hidden lg:block relative z-10">
            <Image
              src={featureGraphic}
              alt="Phone in hand"
              quality={100}
              width={569 * 0.9}
              height={506 * 0.9}
              placeholder="blur"
              priority
            />
          </div>
        </div>
      </section>
      <section className="mt-20 md:mt-28 px-5 md:px-8 max-w-8xl mx-auto">
        <EmojiIcon emoji="📈" />
        <h3 className="font-display text-gray-600">
          Engage Readers Like <br />{" "}
          <span className="h3 text-gray-900">You’ve Never Done Before</span>
        </h3>
        <p className="text-gray-600 mt-2">
          With these stats, think about how much bigger you can be!
        </p>
        <div className="grid max-w-3xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 mt-14">
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
      <div className="px-5 md:px-8 max-w-8xl mx-auto">
        <Footer />
      </div>
    </div>
  );
};
