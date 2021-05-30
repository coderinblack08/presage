import { useSoundbitesQuery } from "@presage/gql";
import React from "react";
import { Banner } from "../components/Banner";
import { SoundbiteCard } from "../components/SoundBiteCard";
import { Layout } from "../layout/Layout";

const Publishers: React.FC = () => {
  const { data } = useSoundbitesQuery({ variables: { limit: 4 } });

  return (
    <Layout>
      <Banner>
        <main className="lg:max-w-7xl xl:max-w-8xl mx-auto w-full mt-16 px-6">
          <header className="mb-16">
            <h3>Your Personal, Curated Feed</h3>
            <p className="text-gray mt-2">
              Listen to your favorite{" "}
              <span className="text-faint-primary">short-form podcasts</span>{" "}
              and{" "}
              <span className="text-faint-primary">audio-centric content</span>
            </p>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {data?.paginateSoundbites.map((soundbite) => (
              <SoundbiteCard key={soundbite.id} {...soundbite} />
            ))}
            <a href="#" className="text-primary lg:text-center lg:col-span-2">
              Show me more →
            </a>
          </div>
        </main>
      </Banner>
    </Layout>
  );
};

export default Publishers;
