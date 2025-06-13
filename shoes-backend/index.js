import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utilities/db.js";
import Shoes from "./utilities/models/shoes.js";
import authRoutes from "./routes/authRoutes.js";

// Load .env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // ✅ Use dynamic port for Render

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);

// Get all shoes
app.get("/getshoes", async (_, res) => {
  try {
    const shoes = await Shoes.find();
    res.status(200).json(shoes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching shoes", error: error.message });
  }
});

// Add a single shoe
app.post("/addshoes", async (req, res) => {
  const { name, brand, size, price, image, description, stock, category } =
    req.body;

  try {
    const newShoes = new Shoes({
      name,
      brand,
      size,
      price,
      image,
      description,
      stock,
      category,
    });
    await newShoes.save();
    res.status(201).json(newShoes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding shoes", error: error.message });
  }
});

// Add multiple shoes
app.post("/addmultipleshoes", async (req, res) => {
  try {
    const newShoes = await Shoes.insertMany(req.body);
    res.status(201).json(newShoes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding multiple shoes", error: error.message });
  }
});

// Delete all shoes
app.delete("/deleteAllShoes", async (req, res) => {
  try {
    await Shoes.deleteMany({});
    res.status(200).json({ message: "All shoes deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting shoes", error: error.message });
  }
});

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
