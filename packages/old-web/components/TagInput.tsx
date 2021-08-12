import React, { useState } from "react";
import { Select } from "./Select";

interface TagInputProps {}

interface Tag {
  id: number | string;
  name: string;
}

export const TagInput: React.FC<TagInputProps> = ({}) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const suggestions = [
    { id: 1, name: "Apples" },
    { id: 2, name: "Pears" },
    { id: 3, name: "Peaches" },
    { id: 4, name: "Avocados" },
  ];

  return (
    <div className="flex items-center rounded-lg relative cursor-text w-full h-12 bg-gray-600">
      <div className="flex items-center px-2 pr-40 space-x-2 py-2.5 overflow-x-auto">
        {tags.length ? (
          tags.map((tag, index) => (
            <button
              onClick={() => {
                const newTags = [...tags];
                newTags.splice(index, 1);
                setTags(newTags);
              }}
              key={tag.id}
              className="bg-gray-500 rounded-full px-4 py-1"
            >
              {tag.name}
            </button>
          ))
        ) : (
          <p className="text-gray-300 px-3">No Tags Selected</p>
        )}
      </div>
      <div className="absolute right-0 inset-y-0 h-full">
        <Select
          className="bg-gray-600/60 w-36 truncate backdrop-blur-lg focus:ring-0 !h-full border-r-0 border-t-0 border-b-0 rounded-none rounded-r-lg font-medium text-gray-200"
          onChange={(e) => {
            if (e.target.value) {
              setTags([...tags, suggestions[parseInt(e.target.value)]]);
            }
          }}
        >
          <option value="">Add tag</option>
          {suggestions.map((suggestion, index) => (
            <option key={suggestion.id} value={index}>
              {suggestion.name}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};
