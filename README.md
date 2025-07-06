# 🎼 Song Service API (Microservice)

Handles song uploading, album management, and song fetching operations. Built as part of a distributed system with PostgreSQL and microservices.

## 🚀 Base URL

```
http://localhost:9000/api/v1
```
## 🧱 Architecture Overview

This project is a full-stack **music streaming platform** built with a **microservice architecture**. It consists of the following services:

- **User Server**: Handles authentication, user profiles, and playlists using **MongoDB**, **JWT**, and **Redis**.
  - **Git**: https://github.com/Jayanthmurala/SpotifyUserBackend
- **Songs Server**: Manages albums and songs with **PostgreSQL**.
  - **Git**: https://github.com/Jayanthmurala/SpotifySongBackend
- **Admin Server**: Provides admin panel APIs for content management using **PostgreSQL**.
  - **Git**: https://github.com/Jayanthmurala/SpotifyAdminBackend
- **Frontend**: Built with **React + TypeScript**, featuring role-based authentication (User/Admin).
  - **Git**: https://github.com/Jayanthmurala/SpotifyFrontend 

![System Architecture](https://ik.imagekit.io/jayanthmurala05/ChatGPT%20Image%20Jul%206,%202025,%2004_17_19%20PM.png?updatedAt=1751798915788)

---

## 🧰 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT Auth (Admin Only)
- Cloudinary (Media)
- Multer (File Uploads)

## 📦 Installation

```bash
cd Song server
npm install
```

### ⚙️ Environment Variables

```env
PORT=9000
DATABASE_URL=your_postgres_connection_string
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

## 📑 API Endpoints

### 🎵 Songs

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| GET    | `/songs`     | Get all songs  |
| GET    | `/songs/:id` | Get song by ID |

### 💽 Albums

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| GET    | `/albums`          | Get all albums        |
| GET    | `/songs/album/:id` | Get songs of an album |

## 🧑 Author

- **Jayanth Murala**
- 📧 jayanthmurala1@gmail.com
- 🔗 [LinkedIn](https://www.linkedin.com/in/jayanth-murala-0045b2281)
