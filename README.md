# Auction Item Management CLI

A command-line interface (CLI) application for managing auction items. Built with Node.js, this tool allows you to add, find, update, remove, and list auction items in a MongoDB database.

## Features

- Add new auction items with title, description, starting price, and reserve price
- Find auction items by title
- Update existing auction items
- Remove auction items
- List all auction items
- Seed database with sample data
- Environment variable configuration for database connection

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or accessible via connection string)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd AuctionItemDB_CLI
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```bash
   MONGODB_URI=mongodb://localhost:27017/auction_db
   ```

4. Seed the database with sample data (optional):
   ```bash
   npm run seed
   ```

## Usage

The CLI provides the following commands:

### Add an Auction Item

```bash
npm start add
# or
node src/commands.js add
```

This will prompt you for:

- Title
- Description
- Starting Price
- Reserve Price

### Find Auction Items

```bash
npm start find "item title"
# or
node src/commands.js find "item title"
```

### Update an Auction Item

```bash
npm start update
# or
node src/commands.js update
```

This will prompt you for:

- Item ID
- Updated fields (leave empty to keep current values)

### Remove an Auction Item

```bash
npm start remove
# or
node src/commands.js remove
```

This will prompt you for the Item ID to remove.

### List All Auction Items

```bash
npm start list
# or
node src/commands.js list
```

### Seed Database

```bash
npm run seed
# or
node src/commands.js seed
```

This will populate the database with sample auction items.

## Project Structure

```
AuctionItemDB_CLI/
├── src/
│   ├── commands.js          # Main CLI entry point
│   ├── config/
│   │   ├── database.js      # Database configuration
│   │   ├── questions.js     # CLI prompts configuration
│   │   └── seed.js         # Sample data and seeding logic
│   ├── controllers/
│   │   └── auction_item_controller.js  # Business logic
│   └── models/
│       └── auction_item.js  # MongoDB model
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
├── package.json           # Project configuration
└── README.md              # This file
```

## Sample Data

The seed command adds the following sample items:

1. Vintage Rolex Watch
2. Antique Furniture Set
3. Classic Car - 1967 Mustang
4. Rare Coin Collection
5. Professional Camera Kit

## Development

To modify the application:

1. Update the model in `src/models/auction_item.js`
2. Modify business logic in `src/controllers/auction_item_controller.js`
3. Update CLI prompts in `src/config/questions.js`
4. Add new commands in `src/commands.js`

## Error Handling

The application includes comprehensive error handling for:

- Database connection issues
- Invalid input data
- Missing required fields
- Price validation (reserve price must be higher than starting price)
