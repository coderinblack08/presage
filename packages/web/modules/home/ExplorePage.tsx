import React from "react";
import { useQuery } from "react-query";
import { Article } from "../../lib/types";

interface ExplorePageProps {}

export const ExplorePage: React.FC<ExplorePageProps> = ({}) => {
  const { data: posts } = useQuery<Article[]>("/articles/explore");

  return <></>;
};
