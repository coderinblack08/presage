import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { PriceCard } from "./PriceCard";

export const PricingPage = ({}) => {
  const [price, setPrice] = useState(false);

  return (
    <div className="py-5 md:py-8">
      <h3 className="font-display">Ready to start with Presage?</h3>
      <p className="text-gray-600 mt-2">
        Presage is free for individuals. Level up by going pro!
      </p>
      <div className="flex items-center mt-4">
        <p className={`pr-3 ${price ? "" : "font-bold"} leading-none`}>
          Monthly
        </p>
        <Switch
          checked={price}
          onChange={setPrice}
          className={`${
            price ? "bg-gray-800" : "bg-gray-200"
          } relative inline-flex flex-shrink-0 h-[24px] w-[44px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
        >
          <span
            className={`${
              price ? "translate-x-[20px]" : "translate-x-0"
            } inline-block pointer-events-none h-[20px] w-[20px] rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
          />
        </Switch>
        <p className={`pl-3 ${!price ? "" : "font-bold"} leading-none`}>
          Annually
        </p>
      </div>
      <div className="md:flex block mt-8 gap-4">
        <PriceCard
          features={[
            "3 free journals",
            "Publish unlimited articles",
            "Read unlimited articles",
            "Saved drafts for articles",
            "Access to public API",
          ]}
          description="A platform for everyone of any skillset."
          title="Free Forever"
          cost={0}
          plan={price ? "yearly" : "monthly"}
        />
        <PriceCard
          features={[
            "Unlimited articles and journals",
            "Access to sponsor market",
            "Publish unlimited articles",
            "Read unlimited articles",
            "Saved drafts for articles",
            "Access to public API",
          ]}
          description="For power users trying to get the most out of Presage."
          title="Professionals"
          cost={price ? 50 : 5}
          plan={price ? "yearly" : "monthly"}
        />
      </div>
    </div>
  );
};
