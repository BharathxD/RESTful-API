import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession } from "../service/session.service";
import { signJWT } from "../utils/jwt.util";
import config from "config";
import { LeanDocument } from "mongoose";
import { ISessionDocument } from "../models/session.model";
import logger from "../utils/logger";

export const createUserSessionHandler = async (req: Request, res: Response) => {
  // Validating the users password
  logger.info("Validating user...")
  const user = await validatePassword(req.body);
  // At this point, we know that user is a LeanDocument<IUserDocument> object
  if (!user || typeof user === "boolean") {
    logger.error("Invalid email or password ❌")
    return res.status(401).send({ message: "Invalid email or password" });
  }
  logger.info("User has been validated... ✅")
  // and can safely use it in the code.
  // Creating a session
  const session: LeanDocument<ISessionDocument> = await createSession(
    user._id,
    req.get("user-agent") || ""
  );
  // Creating an access token
  const accessToken = signJWT(
    { ...user.toJSON(), session: session._id },
    {
      expiresIn: config.get<string>("accessTokenTTL"),
      // 15 Minutes
    }
  );
  // Creating a refresh token
  const refreshToken = signJWT(
    { ...user.toJSON(), session: session._id },
    {
      expiresIn: config.get<string>("refreshTokenTTL"),
      // 15 Minutes
    }
  );
  // Return Access and Refresh Token
  return res.send({ accessToken, refreshToken });
};
