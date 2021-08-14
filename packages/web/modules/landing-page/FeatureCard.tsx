import React from "react";
import { MdPlayArrow } from "react-icons/md";

interface FeatureCardProps {
  category: string;
  color: "purple" | "pink" | "red" | "yellow";
  title: string;
  description: string;
  time: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  color,
  title,
  category,
  description,
  time,
}) => {
  const colors = {
    purple: ["text-[#5D5FEF]", "bg-[#D0D1FF]"],
    pink: ["text-[#EF5DA8]", "bg-[#FCDDEC]"],
    red: ["text-[#EF4444]", "bg-[#FEE2E2]"],
    yellow: ["text-[#F59E0B]", "bg-[#FEF3C7]"],
  };
  const [accent, tint] = colors[color];

  return (
    <div className="p-8">
      <span className={accent}>{category}</span>
      <h3 className="font-display font-bold text-2xl">{title}</h3>
      <p className="text-gray-500 mt-2">{description}</p>
      <button className="flex items-center space-x-4 mt-8">
        <div className={`p-1.5 rounded-full ${tint}`}>
          <MdPlayArrow className={`w-8 h-8 ${accent}`} />
        </div>
        <div className="text-left">
          <div className="font-bold">See how it works</div>
          <p className="text-gray-600 text-sm">{time}</p>
        </div>
      </button>
    </div>
  );
};
