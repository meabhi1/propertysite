# Property Rental Website

A full-stack Property Rental Website built using:

- React.js
- Node.js
- Express.js
- MongoDB
- Tailwind CSS
- JWT Authentication

---

# Features

## User Features

- User Signup/Login
- JWT Authentication
- View Properties
- Add Property
- Edit Property
- Upload Property Images
- Responsive UI
- Toast Notifications

---

## Admin Features

- Admin Login
- Manage Properties
- Update Property Listings

---

# Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer

---

# Project Structure

```bash
Property site/
│
├── backend/
│
├── frontend/
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/meabhi1/propertysite.git
```

---

# Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Environment Variables

Create `.env` file inside backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_url

JWT_SECRET=your_secret_key
```

---

# API Endpoints

## Authentication

```bash
POST /api/auth/register
POST /api/auth/login
```

## Property

```bash
GET /api/property
GET /api/property/:id
POST /api/property/create
PUT /api/property/update/:id
DELETE /api/property/delete/:id
```

---

# Screenshots

Add project screenshots here later.

---

# Future Improvements

- Property Search
- Property Filters
- Wishlist
- Payment Integration
- Admin Dashboard
- Dark Mode

---

# Author

Abhijeet Jha
