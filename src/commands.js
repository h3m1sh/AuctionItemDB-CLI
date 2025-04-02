#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import connectDB from "./config/database.js";
import {
  addAuctionItem,
  findAuctionItem,
  updateAuctionItem,
  removeAuctionItem,
  listAuctionItems,
} from "./controllers/auction_item_controller.js";
import { addQuestions, updateQuestions, removeQuestions } from "./config/questions.js";
import { seedDatabase } from "./config/seed.js";

const program = new Command();

program.version("1.0.0").description("Auction Item Management");

// Add Auction Item Command
program
  .command("add")
  .alias("a")
  .description("Add an auction item")
  .action(async () => {
    try {
      await connectDB();
      const answers = await inquirer.prompt(addQuestions);
      await addAuctionItem(answers);
    } catch (error) {
      console.error("Error:", error.message);
      process.exit(1);
    }
  });

// Find Auction Item Command
program
  .command("find <title>")
  .alias("f")
  .description("Find auction items")
  .action(async (title) => {
    try {
      await connectDB();
      await findAuctionItem(title);
    } catch (error) {
      console.error("Error:", error.message);
      process.exit(1);
    }
  });

// Update Auction Item Command
program
  .command("update")
  .alias("u")
  .description("Update an auction item")
  .action(async () => {
    try {
      await connectDB();
      const answers = await inquirer.prompt(updateQuestions);
      const id = answers._id;
      delete answers._id;

      // Filter out empty values
      Object.keys(answers).forEach((key) => {
        if (!answers[key]) delete answers[key];
        // Convert string numbers to actual numbers
        if (key === "start_price" || key === "reserve_price") {
          if (answers[key]) answers[key] = parseFloat(answers[key]);
        }
      });

      await updateAuctionItem(id, answers);
    } catch (error) {
      console.error("Error:", error.message);
      process.exit(1);
    }
  });

// Remove Auction Item Command
program
  .command("remove")
  .alias("r")
  .description("Remove an auction item")
  .action(async () => {
    try {
      await connectDB();
      const answers = await inquirer.prompt(removeQuestions);
      await removeAuctionItem(answers._id);
    } catch (error) {
      console.error("Error:", error.message);
      process.exit(1);
    }
  });

// List All Auction Items Command
program
  .command("list")
  .alias("l")
  .description("List all auction items")
  .action(async () => {
    try {
      await connectDB();
      await listAuctionItems();
    } catch (error) {
      console.error("Error:", error.message);
      process.exit(1);
    }
  });

// Seed Database Command
program
  .command("seed")
  .description("Seed the database with sample auction items")
  .action(async () => {
    try {
      await connectDB();
      await seedDatabase();
    } catch (error) {
      console.error("Error:", error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
