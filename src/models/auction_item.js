import mongoose from "mongoose";

// Auction Item Schema
const auctionItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  start_price: {
    type: Number,
    required: [true, "Starting price is required"],
    min: [0, "Starting price cannot be negative"],
  },
  reserve_price: {
    type: Number,
    required: [true, "Reserve price is required"],
    min: [0, "Reserve price cannot be negative"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Update the updated_at timestamp before saving
auctionItemSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

// Validate that reserve price is higher than start price
auctionItemSchema.pre("save", function (next) {
  if (this.reserve_price < this.start_price) {
    next(new Error("Reserve price must be higher than starting price"));
  }
  next();
});

export default mongoose.model("AuctionItem", auctionItemSchema);
