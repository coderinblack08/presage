import React from "react";
import { useSWRInfinite } from "swr";
import { fetcher } from "../pages/fetcher";
import { Select } from "./Select";

interface CategorySelectProps {}

export const CategorySelect: React.FC<CategorySelectProps> = ({}) => {
  const { data, size, setSize } = useSWRInfinite((index) => {
    return `/api/categories?limit=5&page=${index}`;
  }, fetcher);

  return (
    <Select
      items={data ? data.flat().map((x) => x.name) : []}
      defaultValue="All Categories"
      waypoint={async () => {
        setSize(size + 1);
      }}
    />
  );
};
