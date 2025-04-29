import dotenv from "dotenv";

dotenv.config();

/**
 * Validates the presence of a given environment variable.
 * @param envVar - The environment variable value to validate.
 * @param varName - The name of the environment variable for error reporting.
 * @returns The validated environment variable.
 * @throws Error if the environment variable is missing or undefined.
 */
function validateEnvVar(envVar: string | undefined, varName: string): string {
  if (!envVar) {
    throw new Error(
      `${varName} is missing or undefined in the environment variables.`
    );
  }
  return envVar;
}

// Exporting validated environment variables
export const DB_URI = validateEnvVar(process.env.DB_URI, "DB_URI");
export const PORT = validateEnvVar(process.env.PORT, "PORT");
export const NODE_ENV = validateEnvVar(process.env.NODE_ENV, "NODE_ENV");
export const COOKIE_SECRET = validateEnvVar(
  process.env.COOKIE_SECRET,
  "COOKIE_SECRET"
);
export const AccessToken_Secret_Key = validateEnvVar(
  process.env.AccessToken_Secret_Key,
  "AccessToken_Secret_Key"
);
export const Refresh_Token_Secret_Key = validateEnvVar(
  process.env.RefreshToken_Secret_Key,
  "RefreshToken_Secret_Key"
);
