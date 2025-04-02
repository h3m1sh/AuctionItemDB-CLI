// Auction Item Questions
export const addQuestions = [
  {
    type: "input",
    name: "title",
    message: "Auction Item Title",
    validate: (input) => {
      if (!input) return "Title is required";
      return true;
    },
  },
  {
    type: "input",
    name: "description",
    message: "Auction Item Description",
    validate: (input) => {
      if (!input) return "Description is required";
      return true;
    },
  },
  {
    type: "number",
    name: "start_price",
    message: "Auction Item Starting Price",
    validate: (input) => {
      if (!input) return "Starting price is required";
      if (input < 0) return "Starting price cannot be negative";
      return true;
    },
  },
  {
    type: "number",
    name: "reserve_price",
    message: "Auction Item Reserve Price",
    validate: (input, answers) => {
      if (!input) return "Reserve price is required";
      if (input < 0) return "Reserve price cannot be negative";
      if (input <= answers.start_price) return "Reserve price must be higher than starting price";
      return true;
    },
  },
];

// Update Questions
export const updateQuestions = [
  {
    type: "input",
    name: "_id",
    message: "Enter Auction Item ID to update",
    validate: (input) => {
      if (!input) return "ID is required";
      return true;
    },
  },
  {
    type: "input",
    name: "title",
    message: "Auction Item Title (leave empty to keep current)",
  },
  {
    type: "input",
    name: "description",
    message: "Auction Item Description (leave empty to keep current)",
  },
  {
    type: "input",
    name: "start_price",
    message: "Auction Item Starting Price (leave empty to keep current)",
    validate: (input) => {
      if (input && input < 0) return "Starting price cannot be negative";
      return true;
    },
  },
  {
    type: "input",
    name: "reserve_price",
    message: "Auction Item Reserve Price (leave empty to keep current)",
    validate: (input, answers) => {
      if (input) {
        if (input < 0) return "Reserve price cannot be negative";
        if (answers.start_price && input <= answers.start_price) {
          return "Reserve price must be higher than starting price";
        }
      }
      return true;
    },
  },
];

// Remove Questions
export const removeQuestions = [
  {
    type: "input",
    name: "_id",
    message: "Enter Auction Item ID to remove",
    validate: (input) => {
      if (!input) return "ID is required";
      return true;
    },
  },
];
