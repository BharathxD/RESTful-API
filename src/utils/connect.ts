import mongoose from "mongoose";
import config from "config";

const connect = async () => {
  const dbUri = config.get<string>("dbUri");
  mongoose.set('strictQuery', false)
  try {
    console.log("Connecting to the Database...");
    await mongoose.connect(dbUri);
    console.log("Database Connected ✅");
  } catch (e) {
    console.log("Could not connect to Database ❌");
    console.log(e);
    process.exit(1);
  }
};

export default connect;
