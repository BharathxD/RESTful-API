import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body); // call user service
    return user;
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
    // 409 Conflict
    // It is thrown because, it has violated the unique restriction on the email field in the user model
  }
};
