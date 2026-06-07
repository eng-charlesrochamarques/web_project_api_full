# 🌍 Around The U.S. – Authentication Version

## 📌 Project Description

Around The U.S. is a responsive social media web application developed with React and Vite. The application allows users to register, log in, manage profile information, interact with image cards, and navigate through protected routes using JWT authentication.

This project is an evolution of the original Around The U.S. React version, now including a complete authentication system, responsive mobile interface, protected pages, and improved user experience.

The project focuses on:

- Component-based architecture
- React Hooks and state management
- Reusable UI components
- Protected routes
- JWT authentication
- Responsive design
- REST API integration
- Improved user experience (UX)

---

# 🚀 Technologies Used

- ⚛️ React (with Vite)
- 🧩 JavaScript (ES6+)
- 🎨 CSS3 (BEM methodology)
- 🌐 REST API
- 🔐 JWT Authentication
- 🧭 React Router DOM
- 📦 Vite
- 🧠 Context API
- 📱 Responsive Design

---

# 📂 Project Structure

```bash
src/
├── assets/
├── blocks/
├── components/
│   ├── App.jsx
│   ├── Header/
│   ├── Main/
│   ├── Footer/
│   ├── Login/
│   ├── Register/
│   ├── ProtectedRoute/
│   ├── InfoTooltip/
│   └── Popup/
├── contexts/
│   └── CurrentUserContext.js
├── images/
├── utils/
│   ├── api.js
│   ├── auth.js
│   └── token.js
├── vendor/
├── index.css
└── main.jsx
```

---

# ✨ Features

- 👤 User profile section
- ✏️ Edit profile
- 🖼️ Update avatar
- 🖼️ Cards loaded from API
- ➕ Add new cards
- 🗑️ Delete cards
- ❤️ Like / Unlike cards
- 🖼️ Image preview popup
- 🔐 User registration
- 🔑 Login / Logout
- 🛡️ Protected routes
- 💾 JWT storage in localStorage
- 📱 Responsive mobile layout
- 🍔 Mobile hamburger menu
- ✅ Success and error popups
- ♻️ Reusable popup system
- ⚡ Dynamic rendering with React
- 🌐 Full CRUD API integration

---

# 🧩 Key Concepts Implemented

## 🔹 Components

Reusable React components:

- Header
- Main
- Footer
- Card
- Popup
- Login
- Register
- ProtectedRoute
- InfoTooltip

---

## 🔹 Props

Data and handlers are passed through props:

```jsx
<Card card={card} onCardClick={handleImageClick} onCardLike={handleCardLike} />
```

---

## 🔹 State Management (useState)

React Hooks manage application state:

```jsx
const [cards, setCards] = useState([]);
const [loggedIn, setLoggedIn] = useState(false);
const [popup, setPopup] = useState(null);
```

---

## 🔹 Context API

Global user data using Context:

```jsx
<CurrentUserContext.Provider value={...}>
```

---

## 🔹 Protected Routes

Private routes protected with:

```jsx
<ProtectedRoute loggedIn={loggedIn}>
  <Main />
</ProtectedRoute>
```

---

## 🔹 Conditional Rendering

Dynamic rendering based on state:

```jsx
{
  popup && <Popup onClose={onClosePopup} />;
}
```

---

## 🔹 Dynamic Popup System

Popups rendered dynamically by type:

```jsx
{
  popup.type === "new-card" && <NewCard />;
}
```

---

## 🔹 List Rendering with map()

Cards rendered dynamically:

```jsx
{
  cards.map((card) => <Card key={card._id} card={card} />);
}
```

---

## 🔹 JWT Authentication

Authentication includes:

- User registration
- User login
- JWT storage
- Route protection
- Redirects
- Logout

---

## 🔹 API Integration

REST API used to:

- Fetch users
- Fetch cards
- Update profile/avatar
- Add/delete cards
- Like/unlike cards
- Register/authenticate users

---

## 🔹 Responsive Design

Responsive interface includes:

- Desktop layout
- Mobile layout
- Hamburger menu
- Responsive forms and popups

---

# ⚙️ Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Run the project:

```bash
npm run dev
```

---

# 👨‍💻 Author

Charles Rocha Marques
