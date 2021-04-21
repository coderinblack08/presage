import { format } from "date-fns";
import Link from "next/link";
import React from "react";

interface ArticleCardProps {
  publisher: {
    name: string;
    profile_picture: string;
  } & any;
  image?: string;
  date: string;
  title: string;
  description: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  publisher,
  image,
  date,
  description,
  title,
}) => {
  return (
    <Link href="/">
      <a>
        <article>
          <div className="flex items-start space-x-4">
            <img
              className="w-12 h-12 rounded-full"
              src={publisher.profile_picture}
              alt={title}
            />
            <div className="mb-4">
              <p className="font-bold text-lg text-lighter-gray">
                {publisher.name}
              </p>
              <time dateTime={date} className="text-gray">
                {format(new Date(date), "MMMM dd, yyyy")}
              </time>
            </div>
          </div>
          <h4 className="text-lighter-gray mb-3">{title}</h4>
          <p className="text-light-gray">{description}</p>
          <p className="text-gray mt-6">
            By <span className="text-primary">Eric Levenson</span>
          </p>
        </article>
      </a>
    </Link>
  );
};
