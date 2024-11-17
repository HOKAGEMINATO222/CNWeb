const User = require('../models/userModel'); 

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


const manageProducts = async (req, res) => {
  try {
    // Logic để quản lý sản phẩm
    res.json({ message: 'Managing Products' });
  } catch (error) {
    res.status(500).json({ message: 'Error managing products' });
  }
};

module.exports = { getAdminDashboard, manageUsers, manageProducts, deleteUser };
