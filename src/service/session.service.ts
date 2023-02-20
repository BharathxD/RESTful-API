import sessionModel from "../models/session.model";
import { LeanDocument } from "mongoose";
import { ISessionDocument } from "../models/session.model";

export const createSession = async (userID: string, userAgent: string) => {
  const session = await sessionModel.create({ userID, userAgent });
  return session.toObject() as LeanDocument<ISessionDocument>;
};
