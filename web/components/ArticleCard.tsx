import { format } from "date-fns";
import React from "react";

interface ArticleCardProps {
  publisher_name: string;
  publisher_profile_picture: string;
  image?: string;
  date: string;
  title: string;
  url: string;
  description: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  publisher_name,
  publisher_profile_picture,
  image,
  date,
  description,
  title,
  url,
}) => {
  return (
    // <Link href="/">
    <a href={url} target="_blank">
      <article>
        <div className="flex items-start space-x-4">
          <img
            className="w-12 h-12 rounded-full"
            src={publisher_profile_picture}
            alt={publisher_name}
          />
          <div className="mb-4">
            <p className="font-bold text-lg text-lighter-gray">
              {publisher_name}
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
    // </Link>
  );
};
