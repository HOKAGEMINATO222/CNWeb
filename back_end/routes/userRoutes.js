const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/userMiddleware');

const router = express.Router();

// Đăng ký người dùng
router.post('/register', registerUser);

// Đăng nhập người dùng
router.post('/login', loginUser);

// Middleware xác thực
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: 'Thông tin người dùng', userId: req.user.id });
});

module.exports = router;
