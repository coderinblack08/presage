import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  beta?: boolean;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  description,
  title,
  beta = false,
}) => {
  return (
    <article className="p-5 md:p-7 col-span-1 bg-white shadow rounded-lg">
      <div className="flex items-center space-x-3">
        <h4 className="font-bold text-lg md:h4 text-gray-800">{title}</h4>
        {beta && (
          <div className="px-4 py-1 small rounded-lg bg-gray-800 text-white font-bold">
            BETA
          </div>
        )}
      </div>
      <p className="text-gray-600 mt-1.5 font-normal">{description}</p>
    </article>
  );
};
