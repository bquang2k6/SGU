import { API_ENDPOINTS } from '../config/api';
import { AuthStorage } from '../types/user';

class AuthService {
  async login(username, password) {
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Đăng nhập thất bại');
      }

      const data = await response.json();
      
      // Lưu thông tin user vào localStorage
      if (data.user) {
        AuthStorage.setCurrentUser(data.user);
      }
      
      // Lưu token nếu có
      if (data.token) {
        localStorage.setItem('sgu_token', data.token);
      }

      return {
        success: true,
        message: 'Đăng nhập thành công',
        user: data.user,
        token: data.token
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.message || 'Có lỗi xảy ra khi đăng nhập'
      };
    }
  }

  async logout() {
    try {
      // Xóa thông tin user và token
      AuthStorage.logout();
      localStorage.removeItem('sgu_token');
      
      return {
        success: true,
        message: 'Đăng xuất thành công'
      };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        message: 'Có lỗi xảy ra khi đăng xuất'
      };
    }
  }

  getToken() {
    return localStorage.getItem('sgu_token');
  }

  isAuthenticated() {
    return AuthStorage.isLoggedIn() && this.getToken() !== null;
  }

  getAuthHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }
}

export const authService = new AuthService();
