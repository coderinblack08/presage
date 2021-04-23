import React, { useRef, useState } from "react";
import AutosizeInput from "react-input-autosize";
import useSWR from "swr";
import { ArticleCard } from "../components/ArticleCard";
import { Button } from "../components/Button";
import { CategorySelect } from "../components/CategorySelect";
import { Navbar } from "../components/Navbar";
import { Select } from "../components/Select";
import { fetcher } from "./fetcher";

let active = 0;
const tabs = [
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
  const likeInput = useRef<HTMLDivElement>();
  const [filterOpen, setFilterOpen] = useState(true);
  const [query, setQuery] = useState<any>({ limit: 3 });
  const { data, isValidating } = useSWR(
    `/api/articles?${Object.keys(query)
      .map((x) => x + "=" + query[x])
      .join("&")}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto py-20 lg:py-24 px-6">
        <header>
          <h3>Your Personal, Curated Feed</h3>
          <p className="text-gray mt-2">
            <span className="text-faint-primary">Did you know?</span> — Add
            filters to search through articles
          </p>
        </header>
        <nav className="flex items-center justify-between mt-8 overflow-x-auto relative">
          <ul className="flex items-center space-x-4 flex-shrink relative categories mr-8">
            {tabs.map((category, i) => (
              <li key={i}>
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
            <Button
              size="small"
              color="secondary"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              Filter
            </Button>
            <Button size="small" color="secondary">
              Customize
            </Button>
            <Button size="small">Articles</Button>
          </div>
        </nav>
        {filterOpen && (
          <div className="flex items-center mt-5 space-x-3">
            <Select
              items={["All Publishers", "CNN", "Fox News", "ABC"]}
              defaultValue="All Publishers"
              onChange={(value) => {
                if (value === "All Publishers") {
                  setQuery({ limit: 3 });
                  console.log(query);
                } else {
                  setQuery({ ...query, publisher: value, limit: 10 });
                }
              }}
            />
            <CategorySelect />
            <button
              onFocus={() => likeInput.current.focus()}
              className="flex items-center relative cursor-default py-2 pl-9 pr-4 rounded-8 text-lighter-gray focus:outline-none bg-darker-gray rounded-lg"
            >
              <span className="text-primary text-lg pl-4 z-10 absolute left-0">
                ≥
              </span>
              <AutosizeInput value={0} ref={likeInput} className="autoresize" />
              <p className="text-gray">Likes</p>
            </button>
          </div>
        )}
        {!isValidating ? (
          <div className="grid grid-cols-2 gap-16 mt-24">
            {data
              ?.reduce((acc, cur) => [...acc, cur.articles], [])
              .flat()
              .map((article) => (
                <ArticleCard key={article.title} {...article} />
              ))}
          </div>
        ) : (
          <div className="grid justify-items-center mt-20">
            <p className="text-light-gray">Loading...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
