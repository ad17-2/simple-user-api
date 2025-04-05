.PHONY: dev start test seed docker-up docker-down clean help

# Default target
.DEFAULT_GOAL := help

# Variables
NODE_ENV ?= development
PORT ?= 3000
MONGODB_URI ?= mongodb://localhost:27017/user-api

# Run in development mode
dev:
	@echo "Starting server in development mode..."
	NODE_ENV=$(NODE_ENV) PORT=$(PORT) MONGODB_URI=$(MONGODB_URI) npm run dev

# Run in production mode
start:
	@echo "Starting server in production mode..."
	NODE_ENV=production PORT=$(PORT) MONGODB_URI=$(MONGODB_URI) npm start

# Run all tests
test:
	@echo "Running all tests..."
	npm test

# Seed the database
seed:
	@echo "Seeding the database..."
	NODE_ENV=$(NODE_ENV) MONGODB_URI=$(MONGODB_URI) npm run seed

# Run Docker Compose
docker-up:
	@echo "Starting Docker Compose services..."
	docker-compose up

# Stop Docker Compose
docker-down:
	@echo "Stopping Docker Compose services..."
	docker-compose down

# Clean the project
clean:
	@echo "Cleaning project..."
	rm -rf node_modules
	rm -rf coverage

# Display help information
help:
	@echo "Available commands:"
	@echo "  make dev               - Run in development mode"
	@echo "  make start             - Run in production mode"
	@echo "  make test              - Run all tests"
	@echo "  make seed              - Seed the database with sample data"
	@echo "  make docker-up         - Start Docker Compose services"
	@echo "  make docker-down       - Stop Docker Compose services"
	@echo "  make clean             - Clean the project"
	@echo "  make help              - Display this help message"
	@echo ""
	@echo "Environment variables:"
	@echo "  NODE_ENV               - Node environment (default: development)"
	@echo "  PORT                   - Port to run the server on (default: 3000)"
	@echo "  MONGODB_URI            - MongoDB connection URI (default: mongodb://localhost:27017/user-api)" 