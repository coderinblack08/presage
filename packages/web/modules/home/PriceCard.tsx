import React from "react";
import Link from "next/link";
import { Button } from "../../components/Button";
import { MdCheck } from "react-icons/md";

interface FeatureCardProps {
  title: string;
  description: string;
  features: string[];
  price?: string;
  cost?: number;
}

export const PriceCard: React.FC<FeatureCardProps> = ({
  description,
  title,
  features,
  price,
  cost,
}) => {
  return (
    <article className="relative w-full h-full p-5 my-4 md:p-7 max-w-lg col-span-1 bg-white shadow rounded-lg">
      <h6 className="font-bold  text-gray-500">{title}</h6>

      <div className="flex mt-1">
        <h3 className="text-3xl font-bold leading-8">${cost}</h3>
        <h4 className="leading-8  pb-0">/{price} </h4>
      </div>

      <p className="text-gray-600 mt-2 font-normal">{description}</p>

      <ul className=" inline-block mt-6 mb-12">
        {features.map((item) => (
          <div key="index" className="flex text-gray-600 my-1">
            <MdCheck className="my-auto mr-2" />
            <p>{item}</p>
          </div>
        ))}
      </ul>
      <div>
        <Link href="/" passHref>
          <Button
            size="large"
            color="primary"
            className="w-11/12  m-3 mx-auto inset-x-0 bottom-0 absolute"
          >
            <span>Create free account</span>
          </Button>
        </Link>
      </div>
    </article>
  );
};
