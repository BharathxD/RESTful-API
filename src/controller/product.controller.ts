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

export const updateProductHandler = async (
  req: Request<UpdateProductInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user._id;

  const productId = req.params.productId;
  const update = req.body;

  const product = await findProduct({ productId });

  if (!product) {
    res.sendStatus(404);
  }

  if (product?.user !== userId) {
    res.sendStatus(403);
    // Client is forbidden from accessing a valid URL
  }

  const updatedProduct = await findAndUpdateProduct({ productId }, update, {
    new: true,
  });

  res.send({ updatedProduct });
};

export const getProductHandler = async (
  req: Request<GetProductInput["params"]>,
  res: Response
) => {
  try {
    const productId = req.params.productId;
    const product = findProduct({ productId });
    if (!product) {
      throw new Error("The product doesn't exist");
    }
    return res.status(200).send(product);
  } catch (error: any) {
    res.status(404).send({ message: error.message });
  }
};

export const deleteProductHandler = async (
  req: Request<DeleteroductInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user._id;

  const productId = req.params.productId;

  const product = await findProduct({ productId });

  if (!product) {
    res.sendStatus(404);
  }

  if (product?.user !== userId) {
    res.sendStatus(403);
    // Client is forbidden from accessing a valid URL
  }

  await deleteProduct({ productId });

  res.sendStatus(200);
};
