# Around The U.S. - Backend

## Overview

RESTful API built with Node.js, Express, MongoDB, and Mongoose for the Around The U.S. project.

This version stores users and cards in a MongoDB database and supports basic CRUD operations.

## Features

- Users and cards management
- MongoDB database connection
- Create and delete cards
- Update user profile and avatar
- Like and dislike cards
- Error handling

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- ESLint (Airbnb)

## Run the Project

Install dependencies:

```bash
npm install
```

Start MongoDB locally.

Run the server:

```bash
npm run start
```

Server:

```text
http://localhost:3000
```

Database:

```text
mongodb://localhost:27017/aroundb
```

## Endpoints

```http
GET /users
GET /users/:userId
POST /users
PATCH /users/me
PATCH /users/me/avatar

GET /cards
POST /cards
DELETE /cards/:cardId
PUT /cards/:cardId/likes
DELETE /cards/:cardId/likes
```

## Project Structure

```text
controllers/  - request handlers
models/       - Mongoose schemas and models
routes/       - API routes
app.js        - application entry point
```

## Error Handling

```text
400 - Invalid data
404 - User or card not found
500 - Internal server error
```

## Lint

```bash
npm run lint
```

## Author

Charles Rocha Marques
