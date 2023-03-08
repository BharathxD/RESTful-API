import e, { Request, Response } from "express";
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
  try {
    const { _id: userId } = res.locals.user;
    const { body } = req;

    const product = await createProduct({ ...body, user: userId });

    res.send({ product });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

export const updateProductHandler = async (
  req: Request<UpdateProductInput["params"]>,
  res: Response
) => {
  try {
    const userId = res.locals.user._id;

    const productId = req.params.productId;
    const update = req.body;

    const product = await findProduct({ productId });

    if (!product) {
      throw new Error("The product is not found");
    }

    if (product?.user !== userId) {
      throw new Error("The user is not authorized to do that");
      // Client is forbidden from accessing a valid URL
    }

    const updatedProduct = await findAndUpdateProduct({ productId }, update, {
      new: true,
    });

    res.status(200).send({ updatedProduct });
  } catch (error: any) {
    res.status(404).send({ message: error.message });
  }
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
  try {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const product = await findProduct({ productId });
    if (!product) {
      throw new Error("The product has not been found");
    }
    if (product.user !== userId) {
      throw new Error("The user is not authorized to do this operation");
      // Client is forbidden from accessing a valid URL
    }
    const result = await deleteProduct({ productId });
    res.status(200).send({ message: result });
  } catch (error: any) {
    res.status(404).send({ message: error.message });
  }
};
