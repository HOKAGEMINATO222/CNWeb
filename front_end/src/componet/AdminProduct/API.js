import axios from 'axios';

// URL cơ bản
const BASE_URL = 'http://localhost:5000/admin/products';

// Hàm xử lý response của API (giống như handleResponse)
const handleResponse = (response) => {
  console.log(response)
  // Kiểm tra nếu response không phải 2xx
  if (!response || response.status < 200 || response.status >= 300) {
    const error = response?.data?.message || response.statusText;
    throw new Error(error);
  }
  return response.data; 
};

// Hàm gọi API với axios, nhận URL, method và body
const apiCall = async (url, method, body = null) => {
  try {
    const token = localStorage.getItem('authToken'); 

    const options = {
      method,
      url,
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json', 
      },
      data: body,  
    };
    const response = await axios(options); 
    return handleResponse(response); 
  } catch (error) {
    console.error("API Error:", error.response || error.message); 
    throw new Error(error?.response?.data?.message || error.message); 
  }
};

// Thêm sản phẩm
export const addProductAPI = async (products) => {
  const url = BASE_URL; // URL của API thêm sản phẩm
  const method = 'POST';  // Phương thức POST
  const body = JSON.stringify(products);  // Chuyển sản phẩm thành JSON string
  return apiCall(url, method, body); // Gọi api
};

// Cập nhật sản phẩm
export const updateProductAPI = async (id, product) => {
  const url = `${BASE_URL}/${id}`; // URL của API cập nhật sản phẩm
  const method = 'PATCH'; // Phương thức PATCH
  const body = JSON.stringify(product); // Chuyển sản phẩm thành JSON string
  return apiCall(url, method, body); // Gọi api
};

// Xóa sản phẩm
export const deleteProductAPI = async (productId) => {
  const url = `${BASE_URL}/${productId}`; 
  console.log(url)
  const method = 'DELETE'; 
  return apiCall(url, method, {}); 
};

// Lấy thông tin sản phẩm
export const getProductAPI = async (productId) => {
  const url = `${BASE_URL}/${productId}`; // URL của API lấy thông tin sản phẩm
  const method = 'GET';  // Phương thức GET
  return apiCall(url, method); // Gọi api
};

// Hiển thị tất cả sản phẩm
export const getProductsAPI = async () => {
  const url = BASE_URL; // URL của API lấy tất cả sản phẩm
  const method = 'GET'; // Phương thức GET
  return apiCall(url, method); // Gọi api
};
