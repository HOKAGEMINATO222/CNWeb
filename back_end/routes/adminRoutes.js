const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middlewares/authMiddleware'); 
const {
  getAdminDashboard,
  manageUsers,
  manageProducts,
  deleteUser,
  createProduct,
  deleteProduct,
  updateProduct
} = require('../controllers/adminController');

// Route tổng quan của Admin, bảo vệ và kiểm tra quyền admin
router.get('/dashboard', protect, isAdmin, getAdminDashboard);

// Route quản lý người dùng, bảo vệ và kiểm tra quyền admin
router.get('/users', protect, isAdmin, manageUsers);

// Route xóa user, bảo vệ và kiểm tra quyền admin
router.delete('/users/:id', protect, isAdmin, deleteUser);

// Route quản lý sản phẩm, bảo vệ và kiểm tra quyền admin
router.get('/products', protect, isAdmin, manageProducts);

// Route thêm sản phẩm, bảo vệ và kiểm tra quyền admin
router.post('/products', protect, isAdmin, createProduct);

// Route xóa sản phẩm, bảo vệ và kiểm tra quyền admin
router.delete('/products/:id', protect, isAdmin, deleteProduct);

// Route chỉnh sửa sản phẩm, bảo vệ và kiểm tra quyền admin
router.patch('/products/:id', protect, isAdmin, updateProduct);

module.exports = router;
