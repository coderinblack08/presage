import React from "react";
import Link from "next/link";
import { Button } from "../../components/Button";
import { MdCheck } from "react-icons/md";
import { ItemCheck } from "./LandingPage";

interface FeatureCardProps {
  title: string;
  description: string;
  features: string[];
  plan?: string;
  cost?: number;
}

export const PriceCard: React.FC<FeatureCardProps> = ({
  description,
  title,
  features,
  plan,
  cost,
}) => {
  return (
    <article className="relative w-full h-full p-3 my-4 max-w-sm bg-white shadow rounded-lg">
      <div className="p-3">
        <h6 className="font-semibold text-gray-600">{title}</h6>
        <div className="flex items-center">
          <h3>${cost}</h3>
          <h4>/{plan} </h4>
        </div>
        <p className="text-gray-500 mt-1">{description}</p>
        <ul className="my-6 space-y-4">
          {features.map((item) => (
            <li className="flex space-x-4 items-center" key={item}>
              <ItemCheck size="small" />
              <p className="text-gray-700 font-normal">{item}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Link href="/" passHref>
          <Button size="large" className="w-full">
            Create free account
          </Button>
        </Link>
      </div>
    </article>
  );
};
