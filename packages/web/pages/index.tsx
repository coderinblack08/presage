import React from "react";
import { useQuery } from "react-query";
import { Layout } from "../components/Layout";
import { Echo } from "../lib/types";

const Home: React.FC = () => {
  const { data: echos } = useQuery<Echo[]>("/echo");

  return (
    <Layout>
      <main>
        <h4>Recommended Echos</h4>
        <div className="flex space-x-8 mt-4">
          {echos?.map((echo) => (
            <article className="w-48">
              {echo.thumbnail ? (
                <img
                  src={echo.thumbnail}
                  alt={echo.title}
                  className="w-48 h-48 rounded-lg object-cover"
                />
              ) : null}
              <h6 className="font-bold mt-3 truncate">{echo.title}</h6>
              <p className="text-primary small truncate">
                {echo.duration} — {echo.user.displayName}
              </p>
            </article>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Home;
