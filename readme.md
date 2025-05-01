

# Assessment Task Management App 

This is a full-stack task management application built with a **React frontend** and **Node.js/Express backend**, using **MongoDB** as the database.

## 🚀 Features

- User authentication with access and refresh tokens
- Task creation, management, and deletion
- Secure backend with environment-based configuration
- Modern UI built with React and Vite


## 🌐 Live Links

- **Frontend:** [https://centric-africa-task.vercel.app](https://centric-africa-task.vercel.app)
- **Backend API:** [https://centric-africa-task.onrender.com](https://centric-africa-task.onrender.com)



## 📁 Project Structure

```
centric-africa-task/
├── backend/
└── frontend/
```

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/De-Hype/centric-africa-task
cd centric-africa-task
```

---

### 2. Setting up the Frontend

```bash
cd frontend
npm install
npm run dev
```

Your React app will start on the default Vite port (usually `http://localhost:5173`).

---

### 3. Setting up the Backend

1. Navigate to the `backend` folder:

```bash
cd backend
```

2. Create a `.env` file in the `backend` directory with the following variables:

```env
DB_URI=your_mongo_db_connection_string
PORT=8200
NODE_ENV=development
COOKIE_SECRET=your_cookie_secret
AccessToken_Secret_Key=your_access_token_secret
RefreshToken_Secret_Key=your_refresh_token_secret
```

> ⚠️ **Important:** Replace the placeholder values with your actual secrets. **Never share these publicly.**

3. Install dependencies and run the backend server:

```bash
npm install
npm run dev
```

The backend server should now be running at `http://localhost:8200`.

---

## 📬 API & Environment

- The backend provides RESTful APIs for user and task management.
- Ensure MongoDB is connected via the correct `DB_URI` in `.env`.

---

## 🛠️ Technologies Used

- **Frontend:** React, Vite, Tailwind (optional if used)
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT, HTTP-only cookies


