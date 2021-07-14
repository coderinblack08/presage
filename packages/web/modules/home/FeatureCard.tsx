import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  description,
  title,
}) => {
  return (
    <article className="p-5 md:p-7 col-span-1 bg-white shadow rounded-lg">
      <h4 className="font-bold text-lg md:h4 text-gray-800">{title}</h4>
      <p className="text-gray-600 mt-1.5 font-normal">{description}</p>
    </article>
  );
};
