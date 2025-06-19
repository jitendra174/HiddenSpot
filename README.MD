# 🌍 HiddenSpot – Full Stack Location-Based Mobile App

HiddenSpot is a beautifully designed full-stack **React Native + Node.js + MongoDB** application where users can explore and share secret local places such as cafés, scenic viewpoints, and art corners.

---

## 🚀 Tech Stack

| Layer      | Technology                      |
|------------|----------------------------------|
| Frontend   | React Native (Expo), Expo Router |
| Backend    | Node.js, Express.js              |
| Database   | MongoDB, Mongoose                |
| API Calls  | Axios                            |
| Utilities  | Expo Location, Unsplash fallback |

---

## 📱 Features

- 🖼 Dark-themed responsive mobile UI
- 🧭 Add Hidden Spot with name, description, category, and auto-location
- 🔎 Search spots by name
- 🗺️ Explore map with geolocation markers
- 📦 Spot data stored in MongoDB Atlas
- 📷 Auto image fallback via category using Unsplash
- ⚡ Animated components and polished UX

---

## 📂 Folder Structure

HiddenSpot/
├── client/ # React Native frontend
│ ├── components/
│ ├── screens/
│ ├── constants/
│ └── ...
├── server/ # Express backend
│ ├── models/
│ ├── routes/
│ └── index.js
├── README.md




---

## 🛠️ Running the Project

### 1️⃣ Start the Backend Server

```bash
cd server
npm install
npm run dev


Server runs on http://localhost:5000

MongoDB URI is configured in .env or index.js


Start the Frontend App

cd client
npm install
npx expo start

Use Expo Go on mobile to scan the QR and run the app

Ensure the backend is running to fetch data


🔐 Environment Variables (Backend)

PORT=5000
MONGO_URI=<your-mongodb-uri>
