import {
  adjectives,
  animals,
  colors,
  NumberDictionary,
  uniqueNamesGenerator,
} from "unique-names-generator";

export const generateUsername = () => {
  return uniqueNamesGenerator({
    dictionaries: [
      adjectives,
      colors,
      animals,
      NumberDictionary.generate({ min: 1000, max: 9999 }),
    ],
    separator: "-",
  });
};
