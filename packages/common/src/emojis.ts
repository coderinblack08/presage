export const generateRandomEmoji = () => {
  const emojis = ["🦄", "🤖", "🎲", "🐶", "👻", "🦊", "🐼"];
  return emojis[Math.floor(Math.random() * emojis.length)];
};
