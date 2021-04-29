import React from "react";
import { useSWRInfinite } from "swr";
import { fetcher } from "../lib/fetcher";
import { Select } from "./Select";

interface CategorySelectProps {
  setCategory: (selected: string) => void;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({
  setCategory,
}) => {
  const { data, size, setSize } = useSWRInfinite((index, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null;

    return `/api/categories?limit=5&page=${index}`;
  }, fetcher);

  return (
    <Select
      items={data ? ["All Categories", ...data.flat().map((x) => x.name)] : []}
      defaultValue="All Categories"
      onChange={(value) => setCategory(value)}
      waypoint={async () => {
        setSize(size + 1);
      }}
    />
  );
};
