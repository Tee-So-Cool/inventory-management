# Inventory Management System

This is a simple inventory management system built with NestJS and TypeScript.

## Prerequisites

- Docker
- Docker Compose

## Running the Application

1. Clone the repository.
2. Run `docker-compose up` to start the application and the PostgreSQL database.
3. The API will be available at `http://localhost:3000`.

## API Endpoints

- `POST /inventory/items` - Create a new inventory item.
- `GET /inventory/items/:id` - Get an inventory item by ID.
- `PATCH /inventory/items/:id` - Update an inventory item by ID.
- `DELETE /inventory/items/:id` - Delete an inventory item by ID.
- `GET /inventory/:productName` - Get inventory items by product name.

## Testing

To run the tests, use the following command:

```bash
npm run test