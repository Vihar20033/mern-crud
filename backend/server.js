// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; // ✅ fix path if needed
import itemRoutes from './routes/ItemRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json()); // ✅ fix typo: express.json()

// Add routes
app.use('/api/items', itemRoutes); // ✅ adjust base route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
