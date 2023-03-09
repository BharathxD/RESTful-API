import { DocumentDefinition, FilterQuery } from "mongoose";
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
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    logger.error("Failed to create user", { error });
    return { error: error.message };
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
