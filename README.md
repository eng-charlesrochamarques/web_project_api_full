# 🌎 Around The U.S. – Full Stack Application

## 📋 About the Project

Around The U.S. is a full-stack web application where users can create an account, authenticate securely, manage their profile, upload cards with images, and interact with other content through likes.

This project was developed as part of the TripleTen Software Engineering program and combines a React front-end with a Node.js/Express/MongoDB back-end.

---

## 🚀 Features

### Authentication & Authorization

- User registration
- User login
- JWT-based authentication
- Protected routes
- Persistent login using Local Storage
- Password encryption using bcrypt

### User Management

- View user profile
- Update profile information
- Update avatar

### Cards

- View cards
- Create new cards
- Delete cards
- Like cards
- Remove likes

### Security

- JWT token validation
- Protected API routes
- Password hashing
- Request validation with Celebrate/Joi
- Centralized error handling

### Logging

- Request logging
- Error logging

---

## 🛠️ Technologies Used

### Front-End

- React
- React Router
- JavaScript (ES6+)
- Vite
- CSS

### Back-End

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Celebrate / Joi
- Winston
- Express-Winston
- dotenv
- CORS

---

## 📂 Project Structure

```text
web_project_api_full
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── logs
│   ├── app.js
│   └── package.json
│
└── README.md
```

---

## 🔐 Authentication Flow

1. User registers using:

```http
POST /signup
```

2. User logs in using:

```http
POST /signin
```

3. Server returns a JWT token:

```json
{
  "token": "JWT_TOKEN"
}
```

4. Token is stored in Local Storage.

5. Protected requests include:

```http
Authorization: Bearer JWT_TOKEN
```

---

## 🌐 API Endpoints

### Authentication

| Method | Endpoint | Description       |
| ------ | -------- | ----------------- |
| POST   | /signup  | Create a new user |
| POST   | /signin  | Login user        |

### Users

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| GET    | /users           | Get all users    |
| GET    | /users/me        | Get current user |
| GET    | /users/:userId   | Get user by ID   |
| PATCH  | /users/me        | Update profile   |
| PATCH  | /users/me/avatar | Update avatar    |

### Cards

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| GET    | /cards               | Get all cards |
| POST   | /cards               | Create card   |
| DELETE | /cards/:cardId       | Delete card   |
| PUT    | /cards/:cardId/likes | Like card     |
| DELETE | /cards/:cardId/likes | Remove like   |

---

## ⚙️ Environment Variables

Create a `.env` file inside the backend directory:

```env
JWT_SECRET=your-secret-key
```

---

## 💻 Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd backend

npm install

npm run dev
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 📊 Database

MongoDB Database:

```text
aroundb
```

Collections:

```text
users
cards
```

---

## 📝 Logging

Request logs:

```text
backend/logs/request.log
```

Error logs:

```text
backend/logs/error.log
```

---

## 🔧 Future Improvements

- PM2 process manager
- Nginx reverse proxy
- HTTPS / SSL certificate
- Production deployment
- User role management
- Image upload service
- Improved card ownership permissions

---

## 👨‍💻 Author

**Charles Rocha Marques**

Electronics Engineer | Embedded Systems | Full Stack Development

- React
- Node.js
- MongoDB
- Express
- JavaScript
- Hardware Development
- Embedded Systems

---

## 📌 Project Status

✅ Completed

Developed as the final project of the TripleTen Software Engineering Program.
