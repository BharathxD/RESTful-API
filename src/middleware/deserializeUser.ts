import { verifyJwt } from "../utils/jwt.util";
import { get } from "lodash";
import { Request, Response, NextFunction } from "express";

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );
  // Bearer of the system gets access to the token, so we're gonna remove/replace it
  if (!accessToken) {
    return next();
  }
  const { decoded, expired } = verifyJwt(accessToken, "accessTokenPublicKey");

  if (decoded) {
    res.locals.user = decoded;
    return next();
    // This is goin to attach the user to the res.locals.user
  }
};
