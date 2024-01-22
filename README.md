# Recursif Real-Time Chat Application - Backend Documentation

Welcome to the documentation for the backend of the Recursif Real-Time Chat Application! This section provides detailed information about the backend components and functionalities.

## Table of Contents

1. [Technical Stack](#technical-stack)
2. [Database Schema](#database-schema)
3. [API Documentation](#api-documentation)
    - [User API](#user-api)
    - [Benefit API](#benefit-api)
    - [Chat API](#chat-api)
4. [Benefits of Using Mongoose Database](#benefits-of-using-mongoose-database)

## Technical Stack

- **Backend:** Node.js
- **Database:** MongoDB with Mongoose
- **Server Framework:** Express.js
- **Real-time communication:** Socket.io

## API Documentation

# User Authentication API Documentation

This documentation provides an overview of the User Authentication API for the Recursif Real-Time Chat Application backend. The API includes functionality for user login and signup.

## Table of Contents

1. [Login](#login)
2. [Sign Up](#sign-up)

## Login

### Endpoint

`POST /api/auth/login`

### Description

Authenticate the user and provide access to the application based on the provided credentials.

### Request

- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`

- **Body:**

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Responses

- **Success Response:**
  - **Status Code:** `200 OK`
  - **Body:**

    ```json
    {
      "user": {
        "_id": "123456789",
        "name": "John Doe",
        "email": "user@example.com",
        "role": "Employee",
        "department": "IT"
      }
    }
    ```

- **Error Responses:**
  - **Status Code:** `404 Not Found`
    - **Body:**

      ```json
      {
        "message": "User not found"
      }
      ```

  - **Status Code:** `401 Unauthorized`
    - **Body:**

      ```json
      {
        "message": "Invalid password"
      }
      ```

  - **Status Code:** `400 Bad Request`
    - **Body:**

      ```json
      {
        "message": "Sorry, it seems there is trouble accessing this page"
      }
      ```

## Sign Up

### Endpoint

`POST /api/auth/signup`

### Description

Create a new user account for accessing the application.

### Request

- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`

- **Body:**

  ```json
  {
    "name": "John Doe",
    "email": "user@example.com",
    "role": "Employee",
    "department": "IT",
    "password": "password123"
  }
  ```

### Responses

- **Success Response:**
  - **Status Code:** `200 OK`
  - **Body:**

    ```json
    {
      "_id": "123456789",
      "name": "John Doe",
      "email": "user@example.com",
      "role": "Employee",
      "department": "IT"
    }
    ```

- **Error Response:**
  - **Status Code:** `500 Internal Server Error`
    - **Body:**

      ```json
      {
        "error": "An error occurred while signing up."
      }
      ```

---

Feel free to adapt and expand on this documentation based on your specific implementation and requirements.

### User API

#### `GET /api/v1/users`

Get a list of all users.

#### `GET /api/v1/users/{id}`

Get a specific user by ID.

#### `POST /api/v1/users`

Create a new user.

#### `PUT /api/v1/users/{id}`

Update a user.

### Benefit API

#### `GET /api/v1/benefits`

Get a list of all benefits.

#### `GET /api/v1/benefits/{id}`

Get a specific benefit by ID.

#### `GET /api/v1/benefits/search?query={query}`

Search for benefits by name or description.

### Chat API

#### `POST /api/v1/chat`

Send a new message to a specific user or group chat.

#### `GET /api/v1/chat/history?user_id={id}`

Get chat history for a specific user.

#### `GET /api/v1/chat/groups`

Get a list of available group chats.

## Benefits of Using Mongoose Database

1. **Schema-based Modeling:**
   - Mongoose allows defining data schemas, providing a clear structure for data models.

2. **Data Validation:**
   - Mongoose provides built-in validation for data integrity, ensuring that the data conforms to the specified schema.

3. **Flexibility:**
   - Mongoose supports flexible data structures, allowing changes to the schema during development without affecting existing data.

4. **Middleware Support:**
   - Middleware functions can be defined to perform operations before or after certain database actions, enhancing control and customization.

5. **Query Building:**
   - Mongoose simplifies the creation of MongoDB queries, making it easier to interact with the database.

6. **Population:**
   - Mongoose supports population, allowing the retrieval of referenced documents and creating relationships between data.

7. **Ease of Integration:**
   - As an ODM (Object Data Modeling) library for MongoDB and Node.js, Mongoose integrates seamlessly with Node.js applications.

8. **Community Support:**
   - Mongoose has a large and active community, providing resources, documentation, and support for developers.

Feel free to adapt and expand on this documentation based on your specific implementation and requirements.
