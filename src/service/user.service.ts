import mongoose, { DocumentDefinition, FilterQuery } from "mongoose";
import UserModel, { IUserDocument } from "../models/user.model";
import { omit } from "lodash";
import logger from "../utils/logger";
// TypeScript definition

export const createUser = async (
  input: DocumentDefinition<
    Omit<IUserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) => {
  try {
    const user = await UserModel.create(input);
    const { password, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  } catch (error: any) {
    if (error instanceof mongoose.Error.ValidationError) {
      logger.error("Failed to create user: validation error", { error });
      return { error: error.message };
    } else if (error instanceof mongoose.Error.MongoError) {
      logger.error("Failed to create user: mongo error", { error });
      return { error: "Failed to create user" };
    }
    logger.error("Failed to create user: unknown error", { error });
    return { error: "Failed to create user" };
  }
};

export const validatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return null;
  }
  return omit(user.toJSON(), "password");
};

export const findUser = async (query: FilterQuery<IUserDocument>) => {
  try {
    const user = await UserModel.findOne(query);
    return user;
  } catch (error: any) {
    logger.error("Failed to find user", { error });
    return { error: error.message };
  }
};
