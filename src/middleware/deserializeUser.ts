import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.util";
import { reIssueAccessToken } from "../service/session.service";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = get(req, "headers.authorization", "").replace(
      /^Bearer\s/,
      ""
    );

    const refreshToken = get(req, "headers.x-refresh");

    if (!accessToken) {
      return next();
    }

    const { decoded, expired } = verifyJwt(accessToken, "accessTokenPublicKey");

    if (decoded) {
      res.locals.user = decoded;
      return next();
    }

    if (expired && refreshToken) {
      const newAccessToken = await reIssueAccessToken({
        refreshToken: refreshToken.toString(),
      });

      if (newAccessToken) {
        res.setHeader("x-access-token", newAccessToken);
      }

      const result = verifyJwt(
        newAccessToken as string,
        "accessTokenPublicKey"
      );

      res.locals.user = result.decoded;
      return next();
    }

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};

export default deserializeUser;
