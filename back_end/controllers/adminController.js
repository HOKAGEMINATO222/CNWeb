const User = require('../models/userModel'); 
const Product = require('../models/productModel')
const mongoose = require('mongoose');


const getAdminDashboard = (req, res) => {
    res.json({ message: 'Welcome to the Admin Dashboard' });
};

// Lấy tất cả user
const manageUsers = async (req, res) => {
  try {
    const users = await User.find(); // Sử dụng find() để lấy tất cả người dùng
    console.log('Lấy thành công tất cả người dùng!')
    res.json({ message: 'Get All Users', users });

  } catch (error) {
    res.status(500).json({ message: 'Error managing users', error: error.message });
  }
};

// Xóa user 
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User không tồn tại' });
    }
    console.log('Xóa thành công user: ', userId)
    res.status(200).json({ message: 'Xóa user thành công', user: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi xóa user', error: error.message });
  }
};

// Hiển thị tất cả sản phẩm
const manageProducts = async (req, res) => {
  try {
    const products = await Product.find(); 

    console.log('Lấy thành công tất cả sản phẩm!');
    res.json({ message: 'Get All Products', products }); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error managing products', error: error.message });
  }
};

// Tạo sản phẩm mới
const createProduct = async (req, res) => {
  try {
    // Lấy các trường từ request body
    const { 
      name, 
      category, 
      brand, 
      description, 
      specifications, 
      price, 
      sale, 
      quantity, 
      star1,
      star2,
      star3,
      star4,
      star5,
      rating = 0,  
      reviews = {},  
      variants 
    } = req.body;

    // Kiểm tra các trường bắt buộc có tồn tại không
    
    if (!name || !category || !brand || !description || !specifications || !price || !variants) {
      // Log các trường thiếu thông tin
      const missingFields = [
        !name && 'name',
        !category && 'category',
        !brand && 'brand',
        !description && 'description',
        !specifications && 'specifications',
        !price && 'price',
        !sale && 'sale',
        !quantity && 'quantity',
        !variants && 'variants',
      ].filter(Boolean); // Loại bỏ các giá trị false

      // Log danh sách các trường thiếu
      console.log('Các trường thiếu thông tin:', missingFields);

      return res.status(400).json({
        message: 'Thiếu thông tin cần thiết để tạo sản phẩm',
        missingFields,
      });
    }


    // Tạo sản phẩm mới từ thông tin nhận được
    const newProduct = new Product({
      name,
      category,
      brand,
      description,
      specifications,
      price,
      sale,
      quantity,
      rating,
      star1,
      star2,
      star3,
      star4,
      star5,
      reviews,
      variants
    });

    // Lưu sản phẩm vào cơ sở dữ liệu
    const savedProduct = await newProduct.save();

    console.log('Tạo sản phẩm thành công!', savedProduct);
    res.status(201).json({ message: 'Tạo sản phẩm thành công', product: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi tạo sản phẩm', error: error.message });
  }
};

// Xóa sản phẩm
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id; // Lấy id của sản phẩm từ URL
    const product = await Product.findByIdAndDelete(id); // Xóa sản phẩm từ database
    console.log('Received request to delete product with ID:', req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }

    res.status(200).json({ message: 'Sản phẩm đã được xóa thành công', id });
  } catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa sản phẩm', error });
  }
};


// Chỉnh sửa sản phẩm
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id; 
    const updateData = req.body; 

    // Kiểm tra nếu id không hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID sản phẩm không hợp lệ' });
    }

    // Tìm và cập nhật sản phẩm
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }

    res.status(200).json({ message: 'Sản phẩm đã được cập nhật thành công', product: updatedProduct });
    console.log('Cập nhập sản phẩm thành công!');
  } catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật sản phẩm', error: error.message });
  }
};


module.exports = { getAdminDashboard, manageUsers, manageProducts, deleteUser, createProduct, deleteProduct, updateProduct };
