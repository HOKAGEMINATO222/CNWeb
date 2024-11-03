// models/UserModel.js
const mongoose = require('mongoose');

// Định nghĩa schema cho người dùng
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true }, // Đảm bảo số điện thoại là duy nhất
    password: { type: String, required: true },
    diaChi: { type: String, required: true },
}, {
    timestamps: true, 
});

// Chỉ định tên collection là 'users'
module.exports = mongoose.model('User', userSchema, 'Users');
