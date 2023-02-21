import { object, number, string, TypeOf } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    description: string({
      required_error: "Description is required",
    }).min(120, "Description should be atleast 120 characters"),
    price: number({
      required_error: "Price is required",
    }),
    image: string({
      required_error: "Image is required",
    }),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: "Product ID is required",
    }),
  }),
};

export const createProductSchema = object({ ...payload });

export const deleteProductSchema = object({ ...params });

export const getProductSchema = object({ ...params });

export const updateProductSchema = object({ ...payload, ...params });

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type DeleteroductInput = TypeOf<typeof deleteProductSchema>;
export type GetProductInput = TypeOf<typeof getProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
