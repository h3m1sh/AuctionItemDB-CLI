# Auction Item Management CLI and API

A command-line interface (CLI) and REST API application for managing auction items. Built with Node.js, this tool allows you to add, search, update, remove, and list auction items in a MongoDB database.

## Features

- Add new auction items with title, description, starting price, and reserve price
- Search auction items by keyword (matching title or description)
- Update existing auction items
- Remove auction items
- List all auction items
- Seed database with sample data
- Environment variable configuration for database connection
- RESTful API for programmatic access

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

## CLI Usage

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

### Search Auction Items

```bash
npm start search "keyword"
# or
node src/commands.js search "keyword"
```

This will search for items with the keyword in the title or description.

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

## API Usage

The application also provides a RESTful API for programmatic access to auction items.

### Start the API Server

```bash
npm run start:api
```

This will start the API server on port 3000 (default).

### API Endpoints

| Endpoint               | Method | Description            | Request Body / Query Params                              |
| ---------------------- | ------ | ---------------------- | -------------------------------------------------------- |
| `/api/auctions`        | GET    | Get all auction items  | None                                                     |
| `/api/auctions/search` | GET    | Search auction items   | `?keyword=value`                                         |
| `/api/auctions`        | POST   | Add new auction item   | JSON with title, description, start_price, reserve_price |
| `/api/auctions/:id`    | PUT    | Update auction item    | JSON with updated fields                                 |
| `/api/auctions/:id`    | DELETE | Delete auction item    | None                                                     |
| `/api/auctions/docs`   | GET    | View API documentation | None                                                     |
| `/api/auctions/health` | GET    | Check API health       | None                                                     |

### Example API Requests

#### Get All Items

```bash
curl http://localhost:3000/api/auctions
```

#### Search Items

```bash
curl http://localhost:3000/api/auctions/search?keyword=vintage
```

#### Add New Item

```bash
curl -X POST http://localhost:3000/api/auctions \
-H "Content-Type: application/json" \
-d '{
  "title": "Vintage Watch",
  "description": "A beautiful antique watch from 1950s",
  "start_price": 1000,
  "reserve_price": 1500
}'
```

#### Update Item

```bash
curl -X PUT http://localhost:3000/api/auctions/60f5e4b1c2f3a23f5c8a7e9d \
-H "Content-Type: application/json" \
-d '{
  "title": "Updated Watch Title",
  "description": "Updated description"
}'
```

#### Delete Item

```bash
curl -X DELETE http://localhost:3000/api/auctions/60f5e4b1c2f3a23f5c8a7e9d
```

#### API Documentation

```bash
curl http://localhost:3000/api/auctions/docs
```

## Project Structure

```
AuctionItemDB_CLI/
├── src/
│   ├── commands.js          # Main CLI entry point
│   ├── config/
│   │   ├── database.js      # Database configuration
│   │   ├── questions.js     # CLI prompts configuration
│   │   └── seed.js          # Sample data and seeding logic
│   ├── controllers/
│   │   └── auction_item_controller.js  # Business logic
│   ├── models/
│   │   └── auction_item.js  # MongoDB model
│   └── server/
│       ├── server.js        # Express server setup
│       └── routes/
│           └── auction.routes.js  # API routes
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
5. Modify API routes in `src/server/routes/auction.routes.js`

## Error Handling

The application includes comprehensive error handling for:

- Database connection issues
- Invalid input data
- Missing required fields
- Price validation (reserve price must be higher than starting price)
- API error responses with appropriate HTTP status codes
