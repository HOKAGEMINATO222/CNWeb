
const getAdminDashboard = (req, res) => {
    res.json({ message: 'Welcome to the Admin Dashboard' });
  };
  
  const manageUsers = async (req, res) => {
    try {
      // Logic để quản lý người dùng
      res.json({ message: 'Managing Users' });
    } catch (error) {
      res.status(500).json({ message: 'Error managing users' });
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
  