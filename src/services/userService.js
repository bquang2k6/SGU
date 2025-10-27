import { API_ENDPOINTS } from '../config/api';
import { apiService } from './apiService';

class UserService {
  // Cập nhật thông tin người dùng
  async updateUser(userId, userData) {
    try {
      const response = await apiService.put(API_ENDPOINTS.UPDATE_USER(userId), userData);
      return {
        success: true,
        message: response.message || 'Cập nhật thông tin thành công'
      };
    } catch (error) {
      console.error('Update user error:', error);
      return {
        success: false,
        message: error.message || 'Có lỗi xảy ra khi cập nhật thông tin'
      };
    }
  }
}

export const userService = new UserService();
