"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const s3_1 = require("../aws/s3");
const extensions = ["wav", "jpg", "jpeg", "png"];
const upload = multer_1.default({
    storage: multer_s3_1.default({
        s3: s3_1.s3,
        bucket: "soundbubble-resource/resource",
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: function (req, file, callback) {
            let extenstion = file.originalname.split(".").pop()?.toLowerCase();
            if (!extensions.includes(extenstion))
                extenstion = "wav";
            callback(null, Date.now() + "." + extenstion);
        },
    }),
});
exports.default = upload;
//# sourceMappingURL=uploadResources.js.map