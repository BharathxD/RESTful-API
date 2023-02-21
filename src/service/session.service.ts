import { Request, Response } from "express";

import sessionModel, { ISessionDocument } from "../models/session.model";
import { FilterQuery } from "mongoose";

export async function createSession(userId: string, userAgent: string) {
  const session = await sessionModel.create({ user: userId, userAgent });
  return session.toJSON();
}

export const findSession = async (query: FilterQuery<ISessionDocument>) => {
  // Lean is not going to return all the function, it's just going to return the object
  return sessionModel.find(query).lean();
};

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionID = res.locals.user.session;
  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
