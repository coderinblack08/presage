"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateColor = exports.journalColors = void 0;
exports.journalColors = [
    "#FF4A4A",
    "#FFAC4A",
    "#FFD74A",
    "#22C528",
    "#22C5C5",
    "#4AB3FF",
    "#844AFF",
];
const generateColor = () => {
    return exports.journalColors[Math.floor(Math.random() * exports.journalColors.length)];
};
exports.generateColor = generateColor;
//# sourceMappingURL=colors.js.map