import { apiService } from './apiService';
import { API_ENDPOINTS } from '../config/api';

class ScheduleService {
  /**
   * Lấy lịch học của sinh viên
   * @returns {Promise<Object>} Lịch học của sinh viên
   */
  async getMySchedule() {
    try {
      const response = await apiService.get(API_ENDPOINTS.MY_SCHEDULE);
      return {
        success: true,
        data: response.schedule || []
      };
    } catch (error) {
      console.error('Get my schedule error:', error);
      return {
        success: false,
        message: error.message || 'Có lỗi xảy ra khi lấy lịch học',
        data: []
      };
    }
  }

  /**
   * Lấy danh sách đăng ký của sinh viên
   * @returns {Promise<Object>} Danh sách đăng ký
   */
  async getMyRegistrations() {
    try {
      const response = await apiService.get(API_ENDPOINTS.MY_REGISTRATIONS);
      return {
        success: true,
        data: response.registrations || []
      };
    } catch (error) {
      console.error('Get my registrations error:', error);
      return {
        success: false,
        message: error.message || 'Có lỗi xảy ra khi lấy danh sách đăng ký',
        data: []
      };
    }
  }
}

export const scheduleService = new ScheduleService();
