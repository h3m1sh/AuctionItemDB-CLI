import AuctionItem from "../models/auction_item.js";

// Add Auction Item
export const addAuctionItem = async (auctionItem) => {
  try {
    const newItem = await AuctionItem.create(auctionItem);
    console.log("Auction Item Added");
    console.log(newItem);
    return newItem;
  } catch (error) {
    console.error("Error adding auction item:", error.message);
    throw error;
  }
};

// List All Auction Items
export const listAuctionItems = async () => {
  try {
    const items = await AuctionItem.find({});
    console.log("=== All Auction Items ===");
    if (items.length > 0) {
      items.forEach((item) => {
        console.log("-------------------");
        console.log(`ID: ${item._id}`);
        console.log(`Title: ${item.title}`);
        console.log(`Description: ${item.description}`);
        console.log(`Starting Price: $${item.start_price}`);
        console.log(`Reserve Price: $${item.reserve_price}`);
        console.log(`Created: ${item.created_at.toLocaleDateString()}`);
        console.log(`Last Updated: ${item.updated_at.toLocaleDateString()}`);
      });
      console.log("-------------------");
      console.log(`${items.length} items found`);
    } else {
      console.log("No auction items found");
    }
    return items;
  } catch (error) {
    console.error("Error listing auction items:", error.message);
    throw error;
  }
};

// Update Auction Item
export const updateAuctionItem = async (_id, updatedInfo) => {
  try {
    const result = await AuctionItem.findByIdAndUpdate(_id, updatedInfo, {
      new: true,
      runValidators: true,
    });
    if (result) {
      console.log("Auction Item Updated");
      console.log(result);
    } else {
      console.log(`No auction item found with id ${_id}`);
    }
    return result;
  } catch (error) {
    console.error("Error updating auction item:", error.message);
    throw error;
  }
};

// Remove Auction Item
export const removeAuctionItem = async (_id) => {
  try {
    const result = await AuctionItem.findByIdAndDelete(_id);
    if (result) {
      console.log(`Auction Item Removed: ${result.title}`);
    } else {
      console.log(`No auction item found with id ${_id}`);
    }
    return result;
  } catch (error) {
    console.error("Error removing auction item:", error.message);
    throw error;
  }
};

// Search Auction Items
export const searchAuctionItems = async (keyword) => {
  try {
    const search = new RegExp(keyword, "i");
    const items = await AuctionItem.find({
      $or: [{ title: search }, { description: search }],
    });

    console.log("=== Search Results ===");
    if (items.length > 0) {
      items.forEach((item) => {
        console.log("-------------------");
        console.log(`ID: ${item._id}`);
        console.log(`Title: ${item.title}`);
        console.log(`Description: ${item.description}`);
        console.log(`Starting Price: $${item.start_price}`);
        console.log(`Reserve Price: $${item.reserve_price}`);
        console.log(`Created: ${item.created_at.toLocaleDateString()}`);
        console.log(`Last Updated: ${item.updated_at.toLocaleDateString()}`);
      });
      console.log("-------------------");
      console.log(`${items.length} matches found`);
    } else {
      console.log("No matching auction items found");
    }
    return items;
  } catch (error) {
    console.error("Error searching auction items:", error.message);
    throw error;
  }
};
