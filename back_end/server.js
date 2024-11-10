const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');
const app = express();
require('dotenv').config();

const corsOptions = {
    origin: 'http://localhost:3000',  // Chỉ định origin của frontend
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Cho phép gửi cookies hoặc JWT
};


app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Kết nối đến MongoDB Atlas
connectDB();

// Sử dụng routes người dùng
app.use('/', userRoutes);

// Sử dụng rotes admin
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
