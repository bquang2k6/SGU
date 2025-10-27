import { API_ENDPOINTS } from '../config/api';
import { apiService } from './apiService';

class NotificationsService {
  // Lấy danh sách thông báo chưa đọc
  async getUnreadNotifications() {
    try {
      const response = await apiService.get(API_ENDPOINTS.UNREAD_NOTIFICATIONS);
      return {
        success: true,
        data: response.notifications || []
      };
    } catch (error) {
      console.error('Get unread notifications error:', error);
      return {
        success: false,
        message: error.message || 'Có lỗi xảy ra khi lấy danh sách thông báo',
        data: []
      };
    }
  }

  // Đánh dấu thông báo đã đọc
  async markNotificationAsRead(notificationId) {
    try {
      const response = await apiService.post(API_ENDPOINTS.MARK_NOTIFICATION_READ(notificationId));
      return {
        success: true,
        message: response.message || 'Đánh dấu thông báo đã đọc thành công'
      };
    } catch (error) {
      console.error('Mark notification as read error:', error);
      return {
        success: false,
        message: error.message || 'Có lỗi xảy ra khi đánh dấu thông báo đã đọc'
      };
    }
  }
}

export const notificationsService = new NotificationsService();
