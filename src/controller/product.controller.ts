import { Request, Response } from "express";
import {
  createProduct,
  findAndUpdateProduct,
  deleteProduct,
  findProduct,
} from "../service/product.service";
import {
  CreateProductInput,
  DeleteroductInput,
  GetProductInput,
  UpdateProductInput,
} from "../schema/product.schema";

export const createProductHandler = async (
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) => {
  const userId = res.locals.user._id;

  const body = req.body;

  const product = await createProduct({ ...body, user: userId });

  res.send({ product });
};

export const findProductHandler = async (
  req: Request<GetProductInput["params"]>,
  res: Response
) => {};

export const updateProductHandler = async (
  req: Request<{}, {}, UpdateProductInput["params"]>,
  res: Response
) => {};

export const deleteProductHandler = async (req: Request, res: Response) => {};
