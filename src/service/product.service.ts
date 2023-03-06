import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import productModel, { IProductDocument } from "../models/product.model";

export const createProduct = async (
  input: DocumentDefinition<Omit<IProductDocument, "createdAt" | "updatedAt">>
) => {
  return productModel.create(input);
};

export const findProduct = async (
  query: FilterQuery<IProductDocument>,
  options: QueryOptions = { lean: true }
) => {
  return productModel.findOne(query, {}, options).lean();
};

export const findAndUpdateProduct = async (
  query: FilterQuery<IProductDocument>,
  update: UpdateQuery<IProductDocument>,
  options: QueryOptions
) => {
  return productModel.findOneAndUpdate(query, update, options);
}

export const deleteProduct = async (query: FilterQuery<IProductDocument>) => {
  return productModel.deleteOne(query);
};
