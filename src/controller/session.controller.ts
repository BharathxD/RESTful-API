import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {
  createSession,
  findSession,
  updateSession,
} from "../service/session.service";
import { signJwt } from "../utils/jwt.util";
import config from "config";
import logger from "../utils/logger";

export const createUserSessionHandler = async (req: Request, res: Response) => {
  // Validating the users password
  logger.info("Validating user...");
  const user = await validatePassword(req.body);
  // At this point, we know that user is a LeanDocument<IUserDocument> object
  if (!user) {
    logger.error("Invalid email or password ❌");
    return res.status(401).send({ message: "Invalid email or password" });
  }
  logger.info("User has been validated... ✅");
  // and can safely use it in the code.
  // Creating a session
  try {
    const session = await createSession(user._id, req.get("user-agent") || "");
    // Creating an access token
    const accessToken = signJwt(
      { ...user, session: session._id },
      "accessTokenPrivateKey",
      { expiresIn: config.get<string>("accessTokenTTL") } // 15 minutes,
    );
    // Creating a refresh token
    const refreshToken = signJwt(
      { ...user, session: session._id },
      "refreshTokenPrivateKey",
      { expiresIn: config.get<string>("refreshTokenTTL") } // 15 minutes
    );
    // Return Access and Refresh Token
    return res.send({ accessToken, refreshToken });
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const getUserSessionHandler = async (req: Request, res: Response) => {
  const userID = res.locals.user._id;
  const sessions = await findSession({ user: userID, valid: true });
  return res.send(sessions);
};

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionID = res.locals.user.session;
  await updateSession(
    {
      _id: sessionID,
    },
    {
      valid: false,
    }
  );
  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
