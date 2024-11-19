import axios from 'axios';
import AllApi from '../../api/api'


export const deleteUserAPI = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:5000/admin/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa user:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const getUserAPI = async (userId) => {
  return AllApi.getUser(userId)
};



