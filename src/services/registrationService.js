import { apiService } from './apiService';
import { API_ENDPOINTS } from '../config/api';
import { AuthStorage } from '../types/user'; // 👈 Thêm dòng này

class RegistrationService {
  getUsername() {
    const user = AuthStorage.getCurrentUser();
    return user?.username || null;
  }

  async getAvailableCourses() {
    const username = this.getUsername();
    if (!username) return { success: false, message: 'Không tìm thấy username', data: [] };

    try {
      const response = await apiService.get(API_ENDPOINTS.AVAILABLE_COURSES(username));
      return { success: true, data: response.courses || [] };
    } catch (error) {
      console.error('Get available courses error:', error);
      return { success: false, message: error.message, data: [] };
    }
  }

  async checkPrerequisites(subjectId) {
    const username = this.getUsername();
    if (!username) return { success: false, message: 'Không tìm thấy username', data: null };

    try {
      const response = await apiService.post(API_ENDPOINTS.CHECK_PREREQUISITES, {
        studentId: username,
        subjectId
      });
      return { success: true, data: response };
    } catch (error) {
      console.error('Check prerequisites error:', error);
      return { success: false, message: error.message, data: null };
    }
  }

  async checkScheduleConflict(courseClassId) {
    const username = this.getUsername();
    if (!username) return { success: false, message: 'Không tìm thấy username', data: null };

    try {
      const response = await apiService.post(API_ENDPOINTS.CHECK_SCHEDULE_CONFLICT, {
        studentId: username,
        courseClassId
      });
      return { success: true, data: response };
    } catch (error) {
      console.error('Check schedule conflict error:', error);
      return { success: false, message: error.message, data: null };
    }
  }

  async createRegistration(registrationData) {
    const username = this.getUsername();
    if (!username) return { success: false, message: 'Không tìm thấy username', data: null };

    try {
      const response = await apiService.post(API_ENDPOINTS.CREATE_REGISTRATION, {
        ...registrationData,
        studentId: username
      });
      return { success: true, data: response, message: response.message || 'Đăng ký môn học thành công' };
    } catch (error) {
      console.error('Create registration error:', error);
      return { success: false, message: error.message, data: null };
    }
  }
}

export const registrationService = new RegistrationService();
