// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
  AUTH_ENDPOINT: import.meta.env.VITE_API_AUTH_ENDPOINT || '/api/auth/student/login/',
  TIMEOUT: 10000
};

// API Endpoints
export const API_ENDPOINTS = {
  LOGIN: `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_ENDPOINT}`,
  PROFILE: `${API_CONFIG.BASE_URL}/api/student/profile/`,
  CLASSES: `${API_CONFIG.BASE_URL}/api/student/classes/`,
  GRADES: `${API_CONFIG.BASE_URL}/api/student/grades/`,
  DOCUMENTS: `${API_CONFIG.BASE_URL}/api/student/documents/`,
  NOTIFICATIONS: `${API_CONFIG.BASE_URL}/api/student/notifications/`,
  PROGRESS: `${API_CONFIG.BASE_URL}/api/student/progress/`
};
