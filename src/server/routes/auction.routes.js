import express from "express";
import {
  addAuctionItem,
  updateAuctionItem,
  removeAuctionItem,
  listAuctionItems,
  searchAuctionItems,
} from "../../controllers/auction_item_controller.js";

const router = express.Router();

// API Documentation
router.get("/docs", (req, res) => {
  res.json({
    success: true,
    data: {
      endpoints: [
        {
          path: "/",
          method: "GET",
          description: "Get all auction items",
        },
        {
          path: "/search",
          method: "GET",
          description: "Search auction items by keyword",
          queryParams: {
            keyword: "string (required)",
          },
        },
        {
          path: "/",
          method: "POST",
          description: "Add new auction item",
          body: {
            title: "string (required)",
            description: "string (required)",
            start_price: "number (required, >= 0)",
            reserve_price: "number (required, > start_price)",
          },
        },
        {
          path: "/:id",
          method: "PUT",
          description: "Update auction item",
        },
        {
          path: "/:id",
          method: "DELETE",
          description: "Delete auction item",
        },
      ],
    },
  });
});

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// Get all auction items
router.get("/", async (req, res) => {
  try {
    const items = await listAuctionItems();
    res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Search auction items
router.get("/search", async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(400).json({
        success: false,
        error: "Search keyword is required",
      });
    }
    const items = await searchAuctionItems(keyword);
    res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Add new auction item
router.post("/", async (req, res) => {
  try {
    const newItem = await addAuctionItem(req.body);
    res.status(201).json({
      success: true,
      data: newItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// Update auction item
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await updateAuctionItem(req.params.id, req.body);
    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        error: "Auction item not found",
      });
    }
    res.json({
      success: true,
      data: updatedItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// Delete auction item
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await removeAuctionItem(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        error: "Auction item not found",
      });
    }
    res.json({
      success: true,
      data: deletedItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
