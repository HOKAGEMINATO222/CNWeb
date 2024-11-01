// server.js
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Kết nối đến MongoDB Atlas
connectDB();

// Sử dụng routes người dùng
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
