"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const fs_1 = require("fs");
const constants_1 = require("./constants");
const uploadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = `${v4()}`;
    if (constants_1.isDev()) {
        yield new Promise((resolve, reject) => file
            .createReadStream()
            .pipe(fs_1.createWriteStream(`${__dirname}/../../../uploads/${filePath}`))
            .on("finish", () => resolve(true))
            .on("error", () => reject(false)));
    }
    return filePath;
});
exports.uploadFile = uploadFile;
//# sourceMappingURL=uploadFile.js.map