import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";
import { createUserInput } from "../schema/user.schema";

export const createUserHandler = async (
  req: Request<{}, {}, createUserInput["body"]>,
  res: Response
) => {
  try {
    const user = await createUser(req.body); // call user service
    return res.send(user);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
    // 409 Conflict
    // It is thrown because, it has violated the unique restriction on the email field in the user model
  }
};
