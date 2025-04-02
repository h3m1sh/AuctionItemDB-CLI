import AuctionItem from "../models/auction_item.js";

const sampleAuctionItems = [
  {
    title: "Vintage Rolex Watch",
    description:
      "A rare 1956 Rolex Submariner in excellent condition with original box and papers.",
    start_price: 5000,
    reserve_price: 7500,
  },
  {
    title: "Antique Furniture Set",
    description:
      "Complete Victorian-era mahogany dining set with 6 chairs, sideboard, and china cabinet.",
    start_price: 2000,
    reserve_price: 3500,
  },
  {
    title: "Classic Car - 1967 Mustang",
    description: "Fully restored 1967 Ford Mustang GT with matching numbers and original paint.",
    start_price: 15000,
    reserve_price: 25000,
  },
  {
    title: "Rare Coin Collection",
    description:
      "Collection of rare coins including 1909-S VDB Lincoln Cent and 1916-D Mercury Dime.",
    start_price: 3000,
    reserve_price: 5000,
  },
  {
    title: "Professional Camera Kit",
    description:
      "Complete professional photography kit including Sony A7III, 3 premium lenses, and accessories.",
    start_price: 2500,
    reserve_price: 4000,
  },
];

export const seedDatabase = async () => {
  try {
    // Insert sample data
    const items = await AuctionItem.insertMany(sampleAuctionItems);

    console.log("Database seeded successfully!");
    console.log(`${items.length} auction items created.`);

    return items;
  } catch (error) {
    console.error("Error seeding database:", error.message);
    throw error;
  }
};
