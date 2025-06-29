
# 🧵 String Chat App

A real-time chat application built with **React**, **Express**, **Socket.IO**, **MongoDB**, and **Zustand**. Supports image messaging, live online status, and secure user authentication.

## 🌐 Live Demo
> : Deployed on **Render**
> Link : https://string-react-app.onrender.com/

---

## 📦 Tech Stack

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Socket.IO Client](https://socket.io/)
- [React Hot Toast](https://react-hot-toast.com/)
- Cloudinary (optional for images)

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [Socket.IO](https://socket.io/)
- [JWT Authentication](https://jwt.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [CORS](https://www.npmjs.com/package/cors)

---

## 📁 Folder Structure

```
String-chat-app/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── lib/
│   │   └── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── stateStore/
│   │   └── main.jsx
│   └── vite.config.js
│   └── package.json
│
├── .env
└── README.md
```

---

## ⚙️ Setup & Run Locally

### Prerequisites

- Node.js ≥ 18
- MongoDB instance (local or Atlas)

### Clone Repo

```bash
git clone https://github.com/PiyushLohia/String-react-app
cd String-react-app
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` in `backend/`:

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/stringchat
JWT_KEY=your_jwt_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Start server:

```bash
npm run start
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` in `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001
```

Start Vite:

```bash
npm run dev
```

---

## 🚀 Deployment Notes

- Deployed on [Render](https://render.com/)
- Set environment variables in **both frontend and backend**
- Ensure correct `CORS` & `cookie` handling (`credentials: true`)
- Use production URLs like:
  - `VITE_API_BASE_URL=https://your-api.onrender.com/api`
  - `VITE_SOCKET_URL=https://your-api.onrender.com`
  - `CLIENT_URL=https://your-frontend.onrender.com`

---

## ✨ Features

- 🧑‍🤝‍🧑 Real-time Messaging
- 🟢 Online User Tracking
- 🖼️ Image Sharing (base64 preview)
- 🔐 Secure Auth with JWT
- ⚡ Zustand for state management
- 🎨 Fully themed with Tailwind & custom styles

---

## 📸 Screenshots

Coming soon...

---

## 🧑‍💻 Author

- [Piyush Lohia](mailto:piyushlohia1857@gmail.com)

---


