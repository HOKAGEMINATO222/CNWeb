const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middlewares/authMiddleware'); 
const {
  getAdminDashboard,
  manageUsers,
  manageProducts,
} = require('../controllers/adminController');

// Route tổng quan của Admin, bảo vệ và kiểm tra quyền admin
router.get('/dashboard', protect, isAdmin, getAdminDashboard);

// Route quản lý người dùng, bảo vệ và kiểm tra quyền admin
router.get('/users', protect, isAdmin, manageUsers);

// Route quản lý sản phẩm, bảo vệ và kiểm tra quyền admin
router.get('/products', protect, isAdmin, manageProducts);

module.exports = router;
