# Simple User API

A simple Node.js Express API that connects to a MongoDB database and retrieves user data.

## Features

- Express.js REST API
- MongoDB database connection
- GET endpoint to retrieve users by ID
- Age filtering (only returns users with age > 21)
- Request validation with Zod
- Error handling
- Service-Repository-Controller architecture pattern
- Unit tests
- Docker support
- Makefile for streamlined development workflow

## Architecture

This project follows the Service-Repository-Controller pattern:

- **Controller Layer**: Handles HTTP requests and responses, delegating business logic to services
- **Service Layer**: Contains business logic and orchestrates data operations
- **Repository Layer**: Abstracts data access logic and database operations

This pattern provides better separation of concerns, improved testability, and more maintainable code.

## Prerequisites

- Node.js 16+
- MongoDB 6.0+ (or use Docker)
- npm or yarn
- GNU Make (optional, for using Makefile commands)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/simple-user-api.git
   cd simple-user-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   export MONGODB_URI=mongodb://localhost:27017/user-api
   export PORT=3000
   ```

## Usage

### Using Makefile (recommended)

The project includes a Makefile to simplify common tasks:

```bash
# Display all available commands
make help

# Start the server in development mode
make dev

# Run all tests
make test

# Start with Docker Compose
make docker-up

# Stop Docker Compose services
make docker-down
```

### Running Manually

```bash
# Start the server in development mode
npm run dev

# Start the server in production mode
npm start

# Run all tests
npm test
```

### Docker

```bash
# Using docker-compose with Make (recommended)
make docker-up
make docker-down

# Or directly with docker-compose
docker-compose up
docker-compose down
```

## API Endpoints

### GET /users/:id

Retrieves a user by ID if their age is greater than 21.

#### Parameters

- `id`: MongoDB ObjectId of the user

#### Responses

- `200 OK`: User found
  ```json
  {
    "_id": "607f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "johndoe@email.com",
    "age": 30
  }
  ```

- `400 Bad Request`: Invalid ObjectId format
  ```json
  {
    "error": "Invalid user ID format",
    "details": [...]
  }
  ```

- `404 Not Found`: User not found or age ≤ 21
  ```json
  {
    "error": "User not found",
    "message": "User with the specified ID not found or age is not greater than 21"
  }
  ```

- `500 Server Error`: Server error
  ```json
  {
    "error": "Server error",
    "message": "Error message"
  }
  ```

## Project Structure

```
simple-user-api/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers (HTTP layer)
│   ├── services/       # Business logic layer
│   ├── repositories/   # Data access layer
│   ├── models/         # Mongoose models
│   ├── routes/         # Express routes
│   ├── middleware/     # Express middlewares
│   ├── utils/          # Utility functions
│   ├── server.js       # Express app
│   └── index.js        # App entry point
├── tests/
│   └── unit/           # Unit tests
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose configuration
├── Makefile            # Make commands for common tasks
├── .env.example        # Example environment variables
└── package.json        # Project metadata and dependencies
```

## Testing

### Seeding the Database

Before testing the API, you need to populate the database with sample data:

```bash
# Using npm
npm run seed

# Or using Make
make seed
```

This will add several sample users to the database, including:
- Users with age > 21 (will be retrievable via the API)
- Users with age <= 21 (will not be retrievable due to age filtering)

### Manual Testing with curl

You can test the API endpoints manually using curl:

```bash
# Health check
curl -X GET "http://localhost:3000/health"

# Get user by ID (replace with a valid ID from your database)
curl -X GET "http://localhost:3000/users/YOUR_USER_ID"

# Test invalid ID format (should return 400)
curl -X GET "http://localhost:3000/users/invalid-id"
``` 