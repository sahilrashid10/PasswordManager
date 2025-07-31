# SR7_KEEPS_MONGO Backend

This is the backend server for the SR7 Keeps Mongo password manager project.

## Features
- Node.js + Express server
- MongoDB integration
- RESTful API for password management
- Secure storage and retrieval of password entries

## Project Structure
```
backend/
  server.js         # Main server file
  package.json      # Backend dependencies
```

## Getting Started

### 1. Install dependencies
```sh
npm install
```

### 2. Configure Environment
- Set up your MongoDB connection string in the code or via environment variables as needed.

### 3. Run the server
```sh
node server.js
```

The backend will start on the configured port (default: 3000).

## API Endpoints
- `GET /api/passwords` - Get all passwords
- `POST /api/passwords` - Add a new password
- `PUT /api/passwords/:id` - Update a password
- `DELETE /api/passwords/:id` - Delete a password

## License
MIT
