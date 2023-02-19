import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface IUserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const user = {
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

const userSchema = new mongoose.Schema(user, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
