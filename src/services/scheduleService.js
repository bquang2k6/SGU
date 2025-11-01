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
      const rawData = response.schedule || [];
  
      const normalizedData = rawData.map((item, index) => {
        // Ưu tiên dữ liệu trong item.schedule (nếu có)
        const schedule = item.schedule || {};
  
        return {
          courseClassId: item.courseClassId || `UNKNOWN-${index}`,
          courseCode: item.courseCode || 'N/A',
          courseName: item.courseName || 'Chưa rõ tên môn học',
          subject: item.subject || 'Chưa rõ môn học',
          credits: item.credits ?? 0,
          room: item.room || 'Chưa có phòng',
          teacher: item.teacher || 'Chưa có giảng viên',
  
          // Gộp lại từ cả 2 nguồn: item và item.schedule
          dayOfWeek: schedule.dayOfWeek || item.dayOfWeek || 'monday',
          startTime: schedule.startTime || item.startTime || '07:00',
          endTime: schedule.endTime || item.endTime || '09:00',
          datetime: schedule.datetime || item.schedule_datetime || null,
        };
      });
  
      return {
        success: true,
        data: normalizedData,
      };
    } catch (error) {
      console.error('Get my schedule error:', error);
      return {
        success: false,
        message: error.message || 'Có lỗi xảy ra khi lấy lịch học',
        data: [],
      };
    }
  }  

  /**
   * Lấy danh sách đăng ký của sinh viên
   */
  /**
 * Lấy danh sách đăng ký của sinh viên
 */
  async getMyRegistrations() {
    try {
      const response = await apiService.get(API_ENDPOINTS.MY_REGISTRATIONS);
      const rawData = response.registrations || [];

      // 🔹 Chuẩn hóa dữ liệu để tương thích với SchedulePage.jsx
      const normalizedData = rawData.map((item, index) => ({
        registrationId: item.registrationId || `REG-${index}`,
        status: item.status || 'registered',
        registrationDate: item.registrationDate || 'N/A',
        grade: item.grade ?? null,

        // Mô phỏng lại cấu trúc mà UI đang mong đợi
        courseClass: {
          courseClassId: item.courseClassId || 'UNKNOWN',
          courseCode: item.courseCode || 'N/A',
          courseName: item.courseName || 'Chưa rõ tên môn học',
          subject: item.subject || 'Chưa rõ môn học',
          credits: item.credits ?? 0,
        },
        semester: {
          semesterName: item.semester || 'Chưa rõ học kỳ',
        },
      }));

      return {
        success: true,
        data: normalizedData,
      };
    } catch (error) {
      console.error('Get my registrations error:', error);
      return {
        success: false,
        message: error.message || 'Có lỗi xảy ra khi lấy danh sách đăng ký',
        data: [],
      };
    }
  }
}

export const scheduleService = new ScheduleService();
