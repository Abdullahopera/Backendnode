import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    image: String,
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text" });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });

export default mongoose.model("Product", productSchema);
