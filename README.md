# 🎼 Song Service API (Microservice)

Handles song uploading, album management, and song fetching operations. Built as part of a distributed system with PostgreSQL and microservices.

## 🚀 Base URL

```
http://localhost:9000/api/v1
```

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
