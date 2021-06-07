"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileTypeValidation = void 0;
const fileTypeValidation = (type, field, file, cb) => {
    const types = {
        image: /(gif|jpe?g|tiff?|png|webp|bmp)/,
        audio: /(wav|m4a|mp(3|4)|webm|mpeg)/,
    };
    if (file.fieldname === field) {
        if (file.mimetype.startsWith(type) && types[type].test(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error(`File type for ${field} is not supported`));
        }
    }
};
exports.fileTypeValidation = fileTypeValidation;
//# sourceMappingURL=fileTypeValidation.js.map