import mongoose, { Schema } from "mongoose";

export type ProductStatus = "Active" | "Draft" | "Archived";

export interface ProductDoc {
  _id: mongoose.Types.ObjectId;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<ProductDoc>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["Active", "Draft", "Archived"], required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true },
);

productSchema.index({ name: 1 });
productSchema.index({ category: 1 });

export const Product = mongoose.model<ProductDoc>("Product", productSchema);
