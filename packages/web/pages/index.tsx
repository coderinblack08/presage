import React from "react";
import { MdChevronRight } from "react-icons/md";
import { useQuery } from "react-query";
import { Layout } from "../components/Layout";
import { Category, Echo } from "../lib/types";
import { EchoCard } from "../modules/feed/EchoCard";

const Home: React.FC = () => {
  const { data: echos, isFetching } = useQuery<Echo[]>("/echo");
  const { data: categories } = useQuery<Category[]>("/echo/categories?limit=4");

  return (
    <Layout>
      <div className="flex gap-x-14 items-start">
        <aside className="w-80 flex-shrink-0">
          <h6 className="text-gray-200 font-semibold mb-5">
            Suggested Accounts
          </h6>
          <ul className="space-y-6 mb-14">
            <li className="flex items-center gap-x-4">
              <img
                src="https://lh3.googleusercontent.com/a-/AOh14Gh5CzIHKFoDwSR2cveuNl3jBNgjjdwjHKeLeH-cNA=s96-c"
                className="w-14 h-14 rounded-full"
              />
              <div>
                <p className="font-bold text-lg">Kevin LooHoo</p>
                <div>
                  <span className="text-gray-200 font-semibold">12k</span>{" "}
                  <span className="text-gray-300 mr-2">Followers</span>
                  <span className="text-primary">@coderinblack</span>
                </div>
              </div>
            </li>
          </ul>
          <div className="flex items-center justify-between mb-5">
            <h6 className="text-gray-200 font-semibold">Popular Categories</h6>
            <a
              href="#"
              className="text-primary font-bold small hover:underline"
            >
              View All →
            </a>
          </div>
          <ul className="space-y-3">
            {categories?.map((category, index) => (
              <li
                key={category.id}
                className={`flex ${
                  index === 0 ? "bg-primary text-gray-700" : "bg-gray-500"
                } font-bold items-center justify-between w-full py-3 px-5 rounded-lg`}
              >
                {category.name}
                <MdChevronRight
                  className={`w-6 h-6 ${index === 0 ? "" : "text-gray-300"}`}
                />
              </li>
            ))}
          </ul>
        </aside>
        <main className="w-full">
          <h4>Recommended Echos</h4>
          <div className="flex gap-x-8 mt-5">
            {isFetching && !echos ? (
              <div className="spinner" />
            ) : (
              echos?.map((echo) => <EchoCard key={echo.id} echo={echo} />)
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
