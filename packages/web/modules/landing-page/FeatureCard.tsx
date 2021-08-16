import React from "react";
import Image from "next/image";
import { MdPlayArrow } from "react-icons/md";

interface FeatureCardProps {
  category: string;
  color: "purple" | "pink" | "red" | "yellow";
  title: string;
  description: string;
  time: string;
  animal: any;
  wip?: boolean;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  color,
  title,
  animal,
  category,
  description,
  time,
  wip,
}) => {
  const colors = {
    purple: ["text-[#5D5FEF]", "bg-[#D0D1FF]"],
    pink: ["text-[#EF5DA8]", "bg-[#FCDDEC]"],
    red: ["text-[#EF4444]", "bg-[#FEE2E2]"],
    yellow: ["text-[#F59E0B]", "bg-[#FEF3C7]"],
  };
  const [accent, tint] = colors[color];

  return (
    <div className="px-8 py-12 flex flex-col lg:flex-row">
      <div className="flex-shrink-0 mr-8">
        <Image quality={100} priority alt="animal" src={animal} />
      </div>
      <div>
        <span className={accent}>{category}</span>
        <h3 className="font-display font-bold text-2xl mt-1">{title}</h3>
        <p className="text-gray-500 mt-2">{description}</p>
        <button className="flex items-center space-x-4 mt-6 lg:mt-8">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${tint}`}
          >
            {wip ? (
              <div className="text-xl">🚧</div>
            ) : (
              <MdPlayArrow className={`w-6 h-6 lg:w-8 lg:h-8 ${accent}`} />
            )}
          </div>
          {wip ? (
            <div className="font-display font-bold">Work in Progress</div>
          ) : (
            <div className="text-left">
              <div className="font-display font-bold">See how it works</div>
              <p className="text-gray-600 text-sm">{time}</p>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
