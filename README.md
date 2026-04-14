# 💬 React SignalR Chat App (Vite)

A real-time chat frontend built using:

* React (Vite)
* SignalR client
* WebSockets (via SignalR)

Connects to a Dockerized ASP.NET SignalR backend.

---

# 🚀 Features

* ✅ Real-time messaging
* 👥 Group-based chat rooms
* 🔁 Auto reconnect
* 🔄 Switch between chat rooms
* ⚡ Fast build with Vite

---

# 🧱 Project Structure

```
src/
 ├── App.jsx
 ├── Chat.jsx
 ├── signalr.js
 └── main.jsx
```

---

# ⚙️ Setup

## 1. Install dependencies

```
npm install
```

## 2. Install SignalR client

```
npm install @microsoft/signalr
```

---

# ▶️ Run App

## Development

```
npm run dev
```

Runs at:

```
http://localhost:5173
```

---

## Preview (Production build)

```
npm run build
npm run preview
```

Runs at:

```
http://localhost:4173
```

---

# 🔌 SignalR Connection

📄 `src/signalr.js`

```
import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5000/chatHub", {
    withCredentials: true
  })
  .withAutomaticReconnect()
  .build();

export default connection;
```

---

# 💬 Chat Functionality

## Join a room

```
connection.invoke("JoinGroup", "room1");
```

## Send message

```
connection.invoke("SendMessageToGroup", "room1", user, message);
```

## Receive message

```
connection.on("ReceiveMessage", (user, message) => {
  // update UI
});
```

---

# 🔁 Room Switching

* Joining a new room automatically removes user from previous room
* Messages are isolated per room

---

# ⚠️ Backend Requirement

Make sure backend is running:

```
http://localhost:5000
```

SignalR endpoint:

```
http://localhost:5000/chatHub
```

---

# 🔥 CORS Requirement (IMPORTANT)

Backend must allow frontend origin:

```
http://localhost:5173
http://localhost:4173
```

---

# 🧪 Testing

1. Open multiple browser tabs
2. Enter different usernames
3. Join same room → messages sync
4. Switch room → messages isolated

---

# 🚨 Common Issues

## ❌ Failed to fetch

* Backend not running
* Wrong URL

## ❌ CORS error

* Backend not allowing origin
* Missing `AllowCredentials()`

## ❌ No messages received

* Not joined to group
* Wrong event name

---

# ⚡ Environment Config (Optional)

You can move URL to env:

📄 `.env`

```
VITE_SIGNALR_URL=http://localhost:5000/chatHub
```

📄 `signalr.js`

```
.withUrl(import.meta.env.VITE_SIGNALR_URL)
```

---

# 🚀 Future Improvements

* 🔐 Authentication (JWT login)
* 👤 Private messaging (user-to-user)
* 💾 Store messages in backend DB
* 🎨 UI improvements (chat bubbles, timestamps)
* 📡 Notifications

---

# 🧠 Notes

* Each browser tab = separate connection
* SignalR handles reconnect automatically
* Messages are not persisted (in-memory)

---

# 🏁 Summary

This app provides a simple and scalable frontend for:

* Real-time chat
* Group communication
* SignalR integration

---

Happy building 🚀
