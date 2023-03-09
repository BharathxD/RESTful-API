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
    return false;
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return false;
  }
  return omit(user.toJSON(), "password");
};

export const findUser = async (query: FilterQuery<IUserDocument>) => {
  return UserModel.findOne(query).lean();
};
