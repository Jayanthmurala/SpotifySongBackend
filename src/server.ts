import express from 'express';
import { config } from 'dotenv';
import songRoutes from './routes/route.js';
import redisClient from './redis/redis.setup.js';
import cors from 'cors';


// Importing environment variables
config();
const app = express();
const PORT = process.env.PORT || 7000;
app.use(express.json());
app.use(cors());
// Routes
app.use("/api/v1",songRoutes)


// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the SPOTIFY🎧 Song Server!🫡');
});


//Redis setup and connection
redisClient.connect().then(() => {
  console.log('Redis client connected successfully');
}).catch((err:any) => {
  console.error('Error connecting to Redis:', err);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});