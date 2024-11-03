// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Đăng ký người dùng
exports.registerUser = async (req, res) => {
    console.log('Received request body:', req.body); // Log body request
    const { userName, phoneNumber, password, diaChi } = req.body;

    try {
        // Kiểm tra xem người dùng đã tồn tại chưa
        let user = await User.findOne({ phoneNumber });
        if (user) {
            return res.status(400).json({ message: 'Người dùng đã tồn tại!' });
        }

        user = new User({
            userName,
            phoneNumber,
            password: await bcrypt.hash(password, 10),
            diaChi,
        });

        await user.save();
        res.status(201).json({ message: 'Đăng ký thành công!' });
    } catch (error) {
        console.error('Error during registration:', error); 
        res.status(500).json({ message: 'Lỗi máy chủ!' });
    }
};

// Đăng nhập người dùng
exports.loginUser = async (req, res) => {
    console.log('Received login request:', req.body); // Log yêu cầu đăng nhập
    const { phoneNumber, password } = req.body;

    try {
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'Thông tin đăng nhập không đúng!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password mismatch');
            return res.status(400).json({ message: 'Thông tin đăng nhập không đúng!' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Login successful:', user.userName);
        res.json({ token, userName: user.userName });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ!' });
    }
};
