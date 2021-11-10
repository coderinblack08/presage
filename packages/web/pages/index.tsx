import type { NextPage } from "next";
import { Button, Input } from "@presage/ui";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center space-y-6 text-center">
      <h1 className="font-bold font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl md:leading-tight lg:leading-tight text-purple-500">
        Earn from publishing <br />
        <span className="text-purple-200">Reward your top readers</span>
      </h1>
      <p className="text-gray-500 text-base md:text-xl max-w-lg leading-relaxed sm:max-w-xl lg:max-w-3xl">
        <strong className="text-gray-300">Quit Medium & Substack</strong> and
        publish on Presage. Brainstorm, draft, and revise without distractions.
        Reward your readers for referring your articles.
      </p>
      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 max-w-lg lg:max-w-xl w-full mt-4 sm:mt-6">
        <Input placeholder="Enter your email..." type="email" />
        <Button
          size="lg"
          variant="outline"
          className="w-full sm:w-auto flex-shrink-0"
        >
          Join Waitlist
        </Button>
      </div>
    </div>
  );
};

export default Home;
