const User = require('../models/userModel'); // Đảm bảo bạn đã import model User

const getAdminDashboard = (req, res) => {
    res.json({ message: 'Welcome to the Admin Dashboard' });
};

const manageUsers = async (req, res) => {
  try {
    const users = await User.find(); // Sử dụng find() để lấy tất cả người dùng
    console.log('Lấy thành công tất cả người dùng!')
    res.json({ message: 'Get All Users', users });
    
  } catch (error) {
    res.status(500).json({ message: 'Error managing users', error: error.message });
  }
};

const manageProducts = async (req, res) => {
  try {
    // Logic để quản lý sản phẩm
    res.json({ message: 'Managing Products' });
  } catch (error) {
    res.status(500).json({ message: 'Error managing products' });
  }
};

module.exports = { getAdminDashboard, manageUsers, manageProducts };
