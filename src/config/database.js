import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to MongoDB
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/auction_db";
    await mongoose.connect(uri);
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
