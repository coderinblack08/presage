import React, { ReactNode } from "react";

interface StatisticProps {
  statistic: string;
  description: string;
}

export const Statistic: React.FC<StatisticProps> = ({
  statistic,
  description,
}) => {
  return (
    <div className="col-span-1 flex flex-col md:flex-row justify-center md:justify-start items-center md:space-x-5 p-8">
      <div className="font-display text-2xl md:text-4xl font-bold">
        {statistic}
      </div>
      <p className="text-gray-500">
        {description.split(" ").map((x) => (
          <div
            className="text-sm md:text-base inline md:block mr-1 md:mr-0"
            key={x}
          >
            {x}
          </div>
        ))}
      </p>
    </div>
  );
};
