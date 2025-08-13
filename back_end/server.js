const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cors = require('cors');
require('dotenv').config();

// Tạo app và server HTTP
const app = express();
const server = http.createServer(app);

// CORS cho API
const corsOptions = {
    origin: ['https://web-hitech.web.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Kết nối DB
connectDB();

// API Routes
app.use('/', userRoutes);
app.use('/admin', adminRoutes);
app.use('/product', productRoutes);
app.use('/orders', orderRoutes);
app.use('/cart', cartRoutes);
app.use('/comments', commentRoutes);

// Socket.IO
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://web-hitech.web.app'],
        methods: ['GET', 'POST'],
    },
});

const connectedUsers = {};

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('set_userid', (userId) => {
        connectedUsers[socket.id] = userId;
        console.log(`UserId ${userId} connected with socketId ${socket.id}`);
    });

    socket.on('send_message', (data) => {
        const userId = connectedUsers[socket.id];
        socket.broadcast.emit('receive_message', { userId, message: data.message });
    });

    socket.on('disconnect', () => {
        const userId = connectedUsers[socket.id];
        console.log(`UserId ${userId} disconnected`);
        delete connectedUsers[socket.id];
    });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server (API + Chat) running on port ${PORT}`);
});
