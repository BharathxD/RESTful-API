import sessionModel, { ISessionDocument } from "../models/session.model";
import { FilterQuery, UpdateQuery } from "mongoose";
import { verifyJwt, signJwt } from "../utils/jwt.util";
import { get } from "lodash";
import { findUser } from "./user.service";
import config from "config";

export async function createSession(userId: string, userAgent: string) {
  const session = await sessionModel.create({ user: userId, userAgent });
  return session.toJSON();
}

export const findSession = async (query: FilterQuery<ISessionDocument>) => {
  // Lean is not going to return all the function, it's just going to return the object
  return sessionModel.find(query).lean();
};

export const updateSession = async (
  query: FilterQuery<ISessionDocument>,
  update: UpdateQuery<ISessionDocument>
) => {
  return sessionModel.updateOne(query, update);
};
export const reIssueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { decoded } = verifyJwt(refreshToken, "refreshTokenPublicKey");
  if (!decoded || !get(decoded, "session")) return false;
  const session = await sessionModel.findById(get(decoded, "_id"));
  if (!session || !session.valid) return false;
  const user = await findUser({ _id: session.user });
  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    "accessTokenPrivateKey",
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  return accessToken;
};
