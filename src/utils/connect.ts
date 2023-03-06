import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

const connect = async () => {
  const dbUri = config.get<string>("dbUri");
  mongoose.set("strictQuery", false);
  try {
    logger.info("Connecting to the Database...");
    await mongoose.connect(dbUri);
    logger.info("Database Connected ✅");
  } catch (e: any) {
    logger.error("Could not connect to Database ❌");
    logger.error("ERROR MESSAGE: ", e.message);
    logger.error("ERROR BODY: ", e);
    process.exit(1);
  }
};

export default connect;
