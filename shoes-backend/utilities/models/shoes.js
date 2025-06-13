import mongoose from "mongoose";

const shoeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    size: { type: String, required: true }, // Size can be anything like "100ml", "Large"
    price: { type: Number, required: true },
    image: { type: String, required: true }, // URL of the shoe image
    description: { type: String, required: true },
    stock: { type: Number, required: true }, // Available stock quantity
    category: { type: String, required: true }, // Example: "Sports", "Casual", etc.
    reviews: [
      {
        user: { type: String, required: true },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5, // Rating between 1 and 5
        },
        comment: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    shareLink: { type: String }, // Optional sharing link
  },
  { timestamps: true }
);

const Shoes = mongoose.model("Shoes", shoeSchema);
export default Shoes;
