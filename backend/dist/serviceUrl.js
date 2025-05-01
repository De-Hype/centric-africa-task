"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Refresh_Token_Secret_Key = exports.AccessToken_Secret_Key = exports.COOKIE_SECRET = exports.NODE_ENV = exports.PORT = exports.DB_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Validates the presence of a given environment variable.
 * @param envVar - The environment variable value to validate.
 * @param varName - The name of the environment variable for error reporting.
 * @returns The validated environment variable.
 * @throws Error if the environment variable is missing or undefined.
 */
function validateEnvVar(envVar, varName) {
    if (!envVar) {
        throw new Error(`${varName} is missing or undefined in the environment variables.`);
    }
    return envVar;
}
// Exporting validated environment variables
exports.DB_URI = validateEnvVar(process.env.DB_URI, "DB_URI");
exports.PORT = validateEnvVar(process.env.PORT, "PORT");
exports.NODE_ENV = validateEnvVar(process.env.NODE_ENV, "NODE_ENV");
exports.COOKIE_SECRET = validateEnvVar(process.env.COOKIE_SECRET, "COOKIE_SECRET");
exports.AccessToken_Secret_Key = validateEnvVar(process.env.AccessToken_Secret_Key, "AccessToken_Secret_Key");
exports.Refresh_Token_Secret_Key = validateEnvVar(process.env.RefreshToken_Secret_Key, "RefreshToken_Secret_Key");
