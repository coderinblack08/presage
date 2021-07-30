/* graciously stolen from dogehouse */
import React from "react";

interface TextParserProps {
  children: string;
  className: string;
}

export const linkRegex = /(^|\s)(https?:\/\/)(www\.)?([-a-z0-9]{1,63}\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\.[a-z]{1,6}(\/[-\\w@\\+\\.~#\\?&/=%]*)?[^\s()]+/;

export const TextParser: React.FC<TextParserProps> = ({
  children,
  className,
}) => {
  return (
    <p className={className}>
      {children.split(/(?=[ ,\n])|(?<=[ ,\n])/g).map((text, i) => {
        if (new RegExp(linkRegex).test(text))
          return (
            <a
              key={i}
              className={"text-blue text-center hover:underline inline"}
              href={text}
            >
              {text}
            </a>
          );
        return text;
      })}
    </p>
  );
};
