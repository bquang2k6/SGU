// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
  TIMEOUT: 10000
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_CONFIG.BASE_URL}/auth/student/login/`,
  CHANGE_PASSWORD: `${API_CONFIG.BASE_URL}/auth/change-password/`,
  
  // Course Classes
  CLASSES: `${API_CONFIG.BASE_URL}/crud/course-classes/`,
  
  // Grades
  MY_GRADES: `${API_CONFIG.BASE_URL}/student/my-grades/`,
  CALCULATE_GPA: `${API_CONFIG.BASE_URL}/services/grades/calculate-gpa/`,
  
  // Documents
  DOCUMENT_REQUESTS: `${API_CONFIG.BASE_URL}/crud/document-requests/`,
  CREATE_DOCUMENT_REQUEST: `${API_CONFIG.BASE_URL}/crud/document-requests/create/`,
  
  // Notifications
  UNREAD_NOTIFICATIONS: `${API_CONFIG.BASE_URL}/services/notifications/unread/`,
  MARK_NOTIFICATION_READ: (notificationId) => `${API_CONFIG.BASE_URL}/services/notifications/${notificationId}/mark-read/`,
  
  // User Management
  UPDATE_USER: (userId) => `${API_CONFIG.BASE_URL}/crud/users/${userId}/update/`,
  
  // Registration & Progress
  AVAILABLE_COURSES: (studentId) => `${API_CONFIG.BASE_URL}/services/registration/available-courses/${studentId}/`,
  CHECK_PREREQUISITES: `${API_CONFIG.BASE_URL}/services/registration/check-prerequisites/`,
  TUITION_FEES: `${API_CONFIG.BASE_URL}/crud/tuition-fees/`
};
