"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomEmoji = void 0;
const generateRandomEmoji = () => {
    const emojis = ["🦄", "🤖", "🎲", "🐶", "👻", "🦊", "🐼"];
    return emojis[Math.floor(Math.random() * emojis.length)];
};
exports.generateRandomEmoji = generateRandomEmoji;
//# sourceMappingURL=emojis.js.map