export const journalColors = [
  "#FF4A4A",
  "#FFAC4A",
  "#FFD74A",
  "#22C528",
  "#22C5C5",
  "#4AB3FF",
  "#844AFF",
];

export const generateColor = () => {
  return journalColors[Math.floor(Math.random() * journalColors.length)];
};
