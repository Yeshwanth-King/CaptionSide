import mongoose, { Document, Model, Schema } from "mongoose";

// Define a TypeScript interface for the Product document
export interface IProduct extends Document {
  Name: string;
  description: string;
  Price: number;
  images: string[];
  category: mongoose.Types.ObjectId; // Referencing another model
  properties: Record<string, any>; // Define more specific type if known
  createdAt?: Date; // Automatically added by Mongoose
  updatedAt?: Date; // Automatically added by Mongoose
}

// Define the Mongoose schema with type annotations
const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    description: { type: String, required: true },
    Price: { type: Number, required: true },
    images: { type: [String], default: [] },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
    properties: { type: Object, default: {} },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }
);

// Create the Mongoose model with the typed schema
const Products: Model<IProduct> =
  mongoose.models.Products || mongoose.model<IProduct>("Products", productSchema);

export default Products;
