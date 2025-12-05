# User Authentication API

A Node.js REST API for user authentication and management using Express.js, MySQL, JWT tokens, and bcrypt for password hashing.

## Features

- User registration (signup)
- User login with JWT token generation
- Update user profile details
- Password hashing with bcrypt
- JWT-based authentication
- MySQL database integration

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt
- **Environment Management**: dotenv

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd userAuth
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_database_name
   DB_PORT=3306
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   ```

## Database Setup

1. Create a MySQL database.

2. Create the `users` table with the following schema:
   ```sql
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       first_name VARCHAR(255) NOT NULL,
       last_name VARCHAR(255) NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       phone_number VARCHAR(20) NOT NULL
   );
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`.

## API Endpoints

### Base URL
```
http://localhost:5000/api/auth
```

### 1. User Signup
- **Endpoint**: `POST /signup`
- **Description**: Register a new user
- **Request Body**:
  ```json
  {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "confirmPassword": "password123",
    "phoneNumber": "+1234567890"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "user created successfully",
    "usesrId": 1
  }
  ```

### 2. User Login
- **Endpoint**: `POST /login`
- **Description**: Authenticate user and return JWT token
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "user fetched successfully",
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "phone_number": "+1234567890"
    }
  }
  ```

### 3. Update User Details
- **Endpoint**: `POST /user/:id`
- **Description**: Update user profile information
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Request Body** (any combination of fields):
  ```json
  {
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "phoneNumber": "+0987654321",
    "password": "newpassword123"
  }
  ```
- **Response**:
  ```json
  {
    "succcess": true,
    "message": "user details updated successfully"
  }
  ```

## Usage Examples

### Using cURL

#### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "confirmPassword": "password123",
    "phoneNumber": "+1234567890"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

#### Update User
```bash
curl -X POST http://localhost:5000/api/auth/user/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "firstName": "Jane"
  }'
```

## Project Structure

```
userAuth/
├── controllers/
│   └── user.controller.js
├── models/
│   └── user.model.js
├── routes/
│   └── user.routes.js
├── utils/
│   └── jwt.js
├── db.js
├── server.js
├── package.json
├── .env
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the ISC License.