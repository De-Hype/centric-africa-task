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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const validate = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if request content type is JSON or form data
        if (req.is('json')) {
            yield schema.parseAsync(req.body);
        }
        else if (req.is('multipart/form-data') == "multipart/form-data") {
            const formData = {};
            // Extract all fields from req.body (excluding files handled by multer)
            for (const key in req.body) {
                if (Object.prototype.hasOwnProperty.call(req.body, key)) {
                    if (key !== 'file') {
                        formData[key] = req.body[key];
                    }
                }
            }
            // Validate the extracted form data against the schema
            yield schema.parseAsync(formData);
        }
        else {
            return next(new AppError_1.default("Unsupported content type", 400));
            //throw new AppError('Unsupported content type', 400);
        }
        next();
    }
    catch (error) {
        if (error.errors) {
            const errorMessages = error.errors.map((e) => e.message).join(', ');
            return next(new AppError_1.default(errorMessages, 400));
        }
        else {
            return next(new AppError_1.default(error.message, 400));
        }
    }
});
exports.default = validate;
