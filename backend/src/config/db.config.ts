import mongoose from "mongoose";

import { DB_URI } from "../../serviceUrl";
import logger from "../middleware/logger";

const ConnectDB = async (): Promise<void> => {
  try {
    if (DB_URI == undefined)
      throw new Error("DB_URI is undefined, please check .env file");
    await mongoose.connect(DB_URI);
    logger.info("Successfully connected to DB");
  } catch (error) {
    logger.error("Error connecting to DB");
  }
};

export default ConnectDB;
