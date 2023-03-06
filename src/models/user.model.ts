import mongoose from "mongoose";
import bcrypt, { hashSync } from "bcrypt";
import config from "config";
import logger from "../utils/logger";

export interface IUserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

const USER = {
  email: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
};

const userSchema = new mongoose.Schema<IUserDocument>(USER, {
  timestamps: true,
});

// Pre-Save hook

userSchema.pre("save", async function (this: IUserDocument, next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
    const hash = hashSync(this.password, salt);
    this.password = hash;
  } catch (error: any) {
    logger.error(error.message);
  } finally {
    next();
  }
});

userSchema.methods.comparePassword = async function (
  this: IUserDocument,
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password).catch(() => false);
};

const User = mongoose.model("User", userSchema);
export default User;
