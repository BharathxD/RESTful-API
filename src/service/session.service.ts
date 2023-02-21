import { Request, Response } from "express";

import sessionModel from "../models/session.model";

export async function createSession(userId: string, userAgent: string) {
  const session = await sessionModel.create({ user: userId, userAgent });
  return session.toJSON();
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionID = res.locals.user.session;
  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
