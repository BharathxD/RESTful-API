import { DocumentDefinition } from "mongoose";
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
    const user = UserModel.create(input);
    return omit((await user).toJSON, "password");
  } catch (error: any) {
    throw new Error(error);
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
  return omit(user.toJSON, "password");
};
