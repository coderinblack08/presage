import React from "react";
import { Button } from "./Button";

interface SoundbiteCardProps {
  title: string;
  description: string;
  thumbnail: string;
  user: any;
}

export const SoundbiteCard: React.FC<SoundbiteCardProps> = ({}) => {
  return (
    <article className="flex items-start space-x-10">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrgcLLlnhTEguYtkqRD_iy-a39nYPEnZ6GpfCO_TxO-5hyS1IuwhMdhNtBdFv6Cwq-oLA&usqp=CAU"
        className="object-cover w-44 h-30 rounded-xl"
        alt="Hello World!"
      />
      <div>
        <span className="text-primary">Programming — EP 2.</span>
        <div className="flex justify-between">
          <h4>Hello World!</h4>
          <Button size="small" color="secondary">
            Follow
          </Button>
        </div>
        <p className="text-light-gray mt-2.5">
          Published by{" "}
          <span className="text-lighter-gray underline">Josh Cornell</span>
        </p>
        <p className="mt-2 text-gray">
          In this episode Adam talks to Ben Orenstein about what you can do to
          stand out if you’re trying to get a job at a small company.
        </p>
        <p className="text-light-gray mt-2.5">
          <span className="font-bold">4:12</span> · <time>2 days ago</time> ·
          24k views
        </p>
      </div>
    </article>
  );
};
