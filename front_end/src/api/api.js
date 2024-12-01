import axios from "axios";

// Base URL local cho API
export const base_url = "http://localhost:5000";

// Cấu hình axios instance
axios.defaults.withCredentials = true;

const apiInstance = axios.create({
  baseURL: base_url,
  timeout: 10000, // Timeout 10 giây
});

// Interceptor để thêm token vào header Authorization
apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor để xử lý lỗi phản hồi
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

// **API Service**
const apiService = {
  
  // **User APIs**
  registerUser: (newUser) => apiInstance.post("/register", newUser),
  loginUser: (user) => apiInstance.post("/login", user),
  getUserProfile: () => apiInstance.get("/profile"),
  getProducts: () => apiInstance.get("/product"),
  updateUserProfile: (userData) => apiInstance.put("/profile", userData), // Chỉnh sửa thông tin cá nhân
  changePassword: (oldPassword, newPassword) => apiInstance.put("/change-password", {
      oldPassword,
      newPassword
  }),

  // **Product APIs**//
  getProductById: (productId) => apiInstance.get(`/product/${productId}`),

  // **Order APIs** 
  createOrder: (orderData) => apiInstance.post("/orders", orderData),
  getUserOrders: (userId) => apiInstance.get(`/orders/${userId}`),
  updateOrderStatus: (orderId, status) =>
    apiInstance.put(`/orders/${orderId}/status`, { status }),
  deleteOrder: (orderId) =>
    apiInstance.delete(`/orders/${orderId}`),

  // **Admin APIs**
  getAdminDashboard: () => apiInstance.get("/admin/dashboard"),
  getAdminProfile: () => apiInstance.get("/admin/profile"),
  updateAdminProfile: (adminData) =>
    apiInstance.patch("/admin/profile", adminData),
  changeAdminPassword: (passwordData) =>
    apiInstance.patch("/admin/change-password", passwordData),

  // **Admin User Management**
  getAllUsers: () => apiInstance.get("/admin/users"),
  deleteUser: (userId) => apiInstance.delete(`/admin/users/${userId}`),

  // **Admin Product Management**
  getAllProducts: () => apiInstance.get("/admin/products"),
  createProduct: (productData) =>
    apiInstance.post("/admin/products", productData),
  deleteProduct: (productId) =>
    apiInstance.delete(`/admin/products/${productId}`),
  updateProduct: (productId, productData) =>
    apiInstance.patch(`/admin/products/${productId}`, productData),

  // **Admin Order Management**
  getAllOrders: () => apiInstance.get("/admin/order"),
  updateOrderAdmin: (orderId, newStatus) =>
    apiInstance.put("/admin/order/update-status", { orderId, newStatus }),
};

export default apiService;
