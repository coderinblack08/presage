import React, { useState } from "react";

import { PriceCard } from "./PriceCard";

export const PricingPage = ({}) => {
  const [price, setPrice] = useState("monthly");
  const togglePrice = () => {
    setPrice(price === "monthly" ? "yearly" : "monthly");
  };

  return (
    <div className="py-5 md:py-8">
      <h3>Ready to start with Presage?</h3>
      <p className="text-gray-600 my-2">
        Presage is free for individuals. Level up by going pro!
      </p>

      <div className="flex">
        <p className={`pr-2 ${price === "monthly" ? "" : "font-bold"}`}>
          Monthly
        </p>
        <label className="flex items-center cursor-pointer">
          <div onClick={togglePrice} className="relative">
            <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
            <div
              className={
                " absolute left-1 top-1 bg-white w-4 h-4 rounded-full " +
                (price === "monthly"
                  ? "translate-x-full transition bg-gray-400"
                  : "translate-x-0 transition bg-white")
              }
            ></div>
          </div>
        </label>
        <p className={`pl-2 ${price === "yearly" ? "" : "font-bold"}`}>
          Annually
        </p>
      </div>

      <div className="flex gap-5">
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
          priceYearly={0}
          price={"monthly"}
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
          priceYearly={price === "monthly" ? 5 : 50}
          price={price}
        />
      </div>
    </div>
  );
};
