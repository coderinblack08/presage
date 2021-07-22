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
    <article className="relative w-80 h-full p-5 my-4 md:p-7 max-w-lg col-span-1 bg-white shadow rounded-lg">
      <h6 className="font-bold text-gray-600">{title}</h6>
      <h4>
        ${priceYearly}/{price}
      </h4>
      <p className="text-gray-600 mt-1.5 font-normal">{description}</p>

      <ul className=" inline-block mt-1 mb-12">
        {features.map((item) => (
          <div key="index" className="flex text-gray-600 my-1">
            <MdCheck className="my-auto mr-2" />
            <p>{item}</p>
          </div>
        ))}
      </ul>
      <div className="justify-center ">
        <Link href="/" passHref>
          <Button
            size="large"
            className="w-56 md:w-72 m-3 justify-center mx-auto inset-x-0 bottom-0 absolute"
          >
            <span>Create free account</span>
          </Button>
        </Link>
      </div>
    </article>
  );
};
