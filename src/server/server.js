import express from "express";
import connectDB from "../config/database.js";
import auctionRoutes from "./routes/auction.routes.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auctions", auctionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message,
  });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
