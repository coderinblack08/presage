import React from "react";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { Select } from "../components/Select";

let active = 0;
const categories = [
  "Top",
  "U.S.",
  "World",
  "Politics",
  "Business",
  "Health",
  "Technology",
  "Entertainment",
];

const Index: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto py-16 lg:py-20 px-6">
        <header>
          <h3>Your Personal, Curated Feed</h3>
          <p className="text-gray mt-2">
            <span className="text-faint-primary">Did you know?</span> — Add
            filters to search through articles
          </p>
        </header>
        <nav className="flex items-center justify-between mt-8 overflow-x-auto relative">
          <ul className="flex items-center space-x-4 flex-shrink relative categories mr-8">
            {categories.map((category, i) => (
              <li>
                <button
                  className={`py-1 px-3 ${
                    active === i
                      ? "text-faint-primary bg-primary bg-opacity-25"
                      : "text-light-gray"
                  } rounded-lg`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
          <div className="space-x-1.5 flex-shrink-0">
            <Button size="small" color="secondary">
              Filter
            </Button>
            <Button size="small" color="secondary">
              Customize
            </Button>
            <Button size="small">Articles</Button>
          </div>
        </nav>
        <div className="flex items-center mt-5 space-x-3">
          <Select
            items={["All Publishers", "CNN", "Fox News", "ABC"]}
            defaultValue="All Publishers"
          />
          <Select
            items={[
              "All Categories",
              "California",
              "Crypto",
              "Donald J. Trump",
            ]}
            defaultValue="All Categories"
          />
          <div className="flex items-center relative py-2 pl-9 pr-4 rounded-8 text-lighter-gray focus:outline-none bg-darker-gray rounded-lg">
            <span className="text-primary text-lg pl-4 z-10 absolute left-0">
              ≥
            </span>
            <div
              className="bg-transparent min-w-[1rem] pr-2 focus:outline-none"
              contentEditable
            >
              0
            </div>
            <p className="text-gray">Likes</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
