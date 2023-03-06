import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";
import { createUserInput } from "../schema/user.schema";
import { omit } from "lodash";

export const createUserHandler = async (
  req: Request<{}, {}, createUserInput["body"]>,
  res: Response
) => {
  try {
    const { body } = req;
    const user = await createUser(body); // call user service
    return res.send(omit(user, "password"));
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
    // 409 Conflict
    // It is thrown because, it has violated the unique restriction on the email field in the user model
  }
};
