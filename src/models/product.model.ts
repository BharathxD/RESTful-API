import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { IUserDocument } from "./user.model";

const nanoId = customAlphabet("abcdefghijklmnopqrstuvxyz1234567890", 10);

export interface IProductDocument extends mongoose.Document {
  user: IUserDocument["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const PRODUCT = {
  productId: {
    type: String,
    required: true,
    unique: true,
    default: () => {
      `product_${nanoId()}`;
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String, 
    required: true,
  },
  price: {
    type: Number, 
    required: true,
  },
  image: {
    type: String, 
    required: true,
  },
};

const productSchema = new mongoose.Schema<IProductDocument>(PRODUCT, {
  timestamps: true,
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
