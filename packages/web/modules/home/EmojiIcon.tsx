import React from "react";

interface EmojiIconProps {
  emoji: string;
}

export const EmojiIcon: React.FC<EmojiIconProps> = ({ emoji }) => {
  return (
    <div className="w-12 h-12 text-2xl shadow mb-5 rounded-lg bg-white flex items-center justify-center">
      {emoji}
    </div>
  );
};
