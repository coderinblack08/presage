import React from "react";
import Link from "next/link";
import { Button } from "../../components/Button";
import { MdCheck } from "react-icons/md";

interface FeatureCardProps {
  title: string;
  description: string;
  features: string[];
  price?: string;
  priceYearly?: number;
}

export const PriceCard: React.FC<FeatureCardProps> = ({
  description,
  title,
  features,
  price,
  priceYearly,
}) => {
  return (
    <article className="p-5 my-4 md:p-7 max-w-lg col-span-1 bg-white shadow rounded-lg">
      <h6>{title}</h6>
      <h3>
        ${priceYearly}/{price}
      </h3>
      <p className="text-gray-600 mt-1.5 font-normal">{description}</p>
      <ul className="list-reset my-2">
        {features.map((item) => (
          <div key="index" className="flex text-gray-600 my-1">
            <MdCheck className="my-auto mr-2" />
            {item}
          </div>
        ))}
      </ul>
      <Link href="/" passHref>
        <Button size="small">
          <span>Create free account</span>
        </Button>
      </Link>
    </article>
  );
};
