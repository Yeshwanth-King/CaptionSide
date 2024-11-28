import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface for the Order document
interface IOrder extends Document {
  line_items: Record<string, any>; // Adjust type based on your line_items structure
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paid: boolean;
  createdAt?: Date; // Optional, added by `timestamps`
  updatedAt?: Date; // Optional, added by `timestamps`
}

// Define the schema
const orderSchema = new Schema<IOrder>(
  {
    line_items: { type: Schema.Types.Mixed, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    paid: { type: Boolean, required: true },
  },
  { timestamps: true }
);

// Create the model or use an existing one
const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default Order;
