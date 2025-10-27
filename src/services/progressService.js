import { API_ENDPOINTS } from '../config/api';
import { apiService } from './apiService';

class ProgressService {
  // Lấy danh sách khóa học có thể đăng ký
  async getAvailableCourses(studentId) {
    try {
      const response = await apiService.get(API_ENDPOINTS.AVAILABLE_COURSES(studentId));
      return {
        success: true,
        data: response.courses || []
      };
    } catch (error) {
      console.error('Get available courses error:', error);
      return {
        success: false,
        message: error.message || 'Có lỗi xảy ra khi lấy danh sách khóa học',
        data: []
      };
    }
  }

  // Kiểm tra điều kiện tiên quyết
  async checkPrerequisites(studentId, subjectId) {
    try {
      const response = await apiService.post(API_ENDPOINTS.CHECK_PREREQUISITES, {
        studentId,
        subjectId
      });
      return {
        success: true,
        data: {
          canRegister: response.canRegister,
          missingPrerequisites: response.missingPrerequisites || []
        }
      };
    } catch (error) {
      console.error('Check prerequisites error:', error);
      return {
        success: false,
        message: error.message || 'Có lỗi xảy ra khi kiểm tra điều kiện tiên quyết',
        data: null
      };
    }
  }

  // Lấy thông tin học phí
  async getTuitionFees() {
    try {
      const response = await apiService.get(API_ENDPOINTS.TUITION_FEES);
      return {
        success: true,
        data: response.tuition_fees || []
      };
    } catch (error) {
      console.error('Get tuition fees error:', error);
      return {
        success: false,
        message: error.message || 'Có lỗi xảy ra khi lấy thông tin học phí',
        data: []
      };
    }
  }
}

export const progressService = new ProgressService();
