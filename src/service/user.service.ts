import { DocumentDefinition } from "mongoose";
import UserModel, { IUserDocument } from "../models/user.model";
// TypeScript definition

export const createUser = async (
  input: DocumentDefinition<Omit<IUserDocument, "createdAt" | "updatedAt">>
) => {
  try {
    return await UserModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};
