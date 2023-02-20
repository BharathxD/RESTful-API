import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession } from "../service/session.service";
import { signJWT } from "../utils/jwt.util";
import config from "config";

export const createUserSessionHandler = async (req: Request, res: Response) => {
  // Validating the users password
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send({ message: "Invalid email or password" });
  }
  // Creating a session
  const session = await createSession(user._id, req.get("user-agent") || "");
  // Creating an access token
  const accessToken = signJWT(
    { ...user, session: session._id },
    {
      expiresIn: config.get<string>("accessTokenTTL"),
      // 15 Minutes
    }
  );
  // Creating a refresh token
  const refreshToken = signJWT(
    { ...user, session: session._id },
    {
      expiresIn: config.get<string>("refershTokenTTL"),
      // 15 Minutes
    }
  );
  // Return Access and Resfresh Token
  return res.send({ accessToken, refreshToken });
};
