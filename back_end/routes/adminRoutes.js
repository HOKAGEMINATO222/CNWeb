const express = require('express');
const router = express.Router();
// const { protect, isAdmin } = require('../middlewares/authMiddleware');
const {
  getAdminDashboard,
  manageUsers,
  manageProducts,
} = require('../controllers/adminController');

// Middleware bảo vệ và kiểm tra quyền admin
router.use(protect, isAdmin);

// Route quản lý người dùng 
router.get('/users', manageUsers);

// Route quản lý sản phẩm 
router.get('/products', manageProducts);

// Route tổng quan của Admin 
router.get('/dashboard', getAdminDashboard);

module.exports = router;
