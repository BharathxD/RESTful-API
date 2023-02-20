import mongoose from "mongoose";
import { IUserDocument } from "./user.model";

export interface ISessionDocument extends mongoose.Document {
  user: IUserDocument["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const SESSION = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  valid: {
    type: Boolean,
    default: true,
  },
  userAgent: {
    type: String,
  },
};

const sessionSchema = new mongoose.Schema<ISessionDocument>(SESSION, { timestamps: true });

const sessionModel = mongoose.model("Session", sessionSchema);

export default sessionModel;
