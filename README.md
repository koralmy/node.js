# Project Overview

This project is a web application built using Node.js and Express, designed to manage users and cards. The application includes authentication, user management, and card management functionalities. The data is stored in a MongoDB database, and the application follows RESTful principles.

## Technologies Used

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing user and card data.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **jsonwebtoken**: For generating and verifying JSON Web Tokens (JWT) for authentication.
- **dotenv**: For loading environment variables from a .env file into process.env.

## Getting Started

To get the project up and running, follow these steps:

1. **Clone the repository**:

   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Create a .env file** in the root directory of the project and add the following content:

```
  # MongoDB connection string
  MONGO_URI=mongodb://127.0.0.1:27017/business-card-app


  # JWT Secret
  JWT_SECRET=1234

  # Node environment
  NODE_ENV=development

  # Port8181
  PORT=
```

# MongoDB connection string

MONGO_URI=mongodb://127.0.0.1:27017/business-card-app

# JWT Secret

JWT_SECRET=1234

# Node environment

NODE_ENV=development

# Port

PORT=8181

````

4. **Start the server**:
   ```sh
   npm start
````

The server should now be running on `http://localhost:8181`.

## API Endpoints

- **Authentication**:

  - `POST /users/login`: Login and get a JWT token.

- **Users**:

  - `GET /users`: Get all users (admin only).
  - `GET /users/:id`: Get a user by ID.
  - `POST /users`: Register a new user.
  - `PUT /users/:id`: Update a user by ID.
  - `DELETE /users/:id`: Delete a user by ID.

- **Cards**:
  - `GET /cards`: Get all cards.
  - `GET /cards/:id`: Get a card by ID.
  - `POST /cards`: Create a new card.
  - `PUT /cards/:id`: Update a card by ID.
  - `DELETE /cards/:id`: Delete a card by ID.

## Project Structure

- `server.js`: Main server file.
- `router/`: Contains route handlers.
- `auth/`: Authentication and authorization middleware.
- `users/`: User-related functionality.
- `cards/`: Card-related functionality.
- `config/`: Configuration files.
- `utils/`: Utility functions.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please contact me at koralstudent@gmail.com.
