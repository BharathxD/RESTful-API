import mongoose from "mongoose";
import config from "config";

const connect = async () => {
  const dbUri = config.get<string>("dbUri");
  try {
    await mongoose.connect(dbUri);
    console.log("Database Connected ✅");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

export default connect;
