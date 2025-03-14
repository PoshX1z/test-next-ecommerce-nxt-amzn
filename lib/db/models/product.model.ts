import { Document, Model, model, models, Schema } from "mongoose";
import { IProductInput } from "@/types";

//IProduct is now combined with Document and IProductInput(from types/index.ts) to actually use for validator
export interface IProduct extends Document, IProductInput {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

//mongoose schema that define structure of data in mongodb and use type validator from IProduct
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: [String],
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    listPrice: {
      type: Number,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    tags: { type: [String], default: ["new arrival"] },
    colors: { type: [String], default: ["White", "Red", "Black"] },
    sizes: { type: [String], default: ["S", "M", "L"] },
    avgRating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    ratingDistribution: [
      {
        rating: {
          type: Number,
          required: true,
        },
        count: {
          type: Number,
          required: true,
        },
      },
    ],
    numSales: {
      type: Number,
      required: true,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Product now is the actual use in other codes (what's add: ensuring there's no duplicate model)
const Product =
  (models.Product as Model<IProduct>) ||
  model<IProduct>("Product", productSchema);

export default Product;
