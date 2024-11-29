<<<<<<< HEAD
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
=======
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { registerSchema, loginSchema } = require('../validation/user')

// Đăng ký người dùng
exports.registerUser = async (req, res) => {
    console.log('Received registration request:', req.body); // Log request body

    // Validate input data
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            success: false, 
            message: error.details.map(detail => detail.message).join(', ') 
        });
    }

    const { userName, phoneNumber, password, diaChi, role } = req.body;

    try {
        // Kiểm tra xem người dùng đã tồn tại chưa
        const existingUser = await User.findOne({ phoneNumber });
        if (existingUser) {
            console.log('User with this phone number already exists');
            return res.status(200).json({ // HTTP 409 Conflict
                success: false, 
                message: 'Người dùng đã tồn tại!'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            userName,
            phoneNumber,
            password: hashedPassword,
            diaChi,
            role
        });

        await newUser.save();
        console.log('User registered successfully');

        // Trả về thông tin người dùng mới đăng ký
        res.status(201).json({ 
            success: true, 
            message: 'Đăng ký thành công!',
            user: {
                id: newUser._id,
                userName: newUser.userName,
                phoneNumber: newUser.phoneNumber,
                diaChi: newUser.diaChi,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Lỗi máy chủ!' 
        });
    }
};

// Đăng nhập người dùng
exports.loginUser = async (req, res) => {
    console.log('Received login request:', req.body);

    // Validate input data
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details.map(detail => detail.message).join(', ') });
    }

    const { phoneNumber, password } = req.body;

    try {
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            console.log('User not found');
            return res.status(200).json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid password');
            return res.status(200).json({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1002h' });
        res.json({ success: true, token, userName: user.userName, role: user.role });
        console.log('Đăng nhập thành công! ', user.userName, token );

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Lỗi máy chủ!' });
    }
};

