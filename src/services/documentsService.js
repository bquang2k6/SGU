import { API_ENDPOINTS } from '../config/api';
import { apiService } from './apiService';

class DocumentsService {
  // Lấy danh sách yêu cầu tài liệu
  async getDocumentRequests() {
    try {
      const response = await apiService.get(API_ENDPOINTS.DOCUMENT_REQUESTS);
      return {
        success: true,
        data: response.document_requests || []
      };
    } catch (error) {
      console.error('Get document requests error:', error);
      return {
        success: false,
        message: error.message || 'Có lỗi xảy ra khi lấy danh sách yêu cầu tài liệu',
        data: []
      };
    }
  }

  // Tạo yêu cầu tài liệu mới
  async createDocumentRequest(requestData) {
    try {
      const response = await apiService.post(API_ENDPOINTS.CREATE_DOCUMENT_REQUEST, requestData);
      return {
        success: true,
        message: response.message || 'Tạo yêu cầu tài liệu thành công',
        data: {
          id: response.id
        }
      };
    } catch (error) {
      console.error('Create document request error:', error);
      return {
        success: false,
        message: error.message || 'Có lỗi xảy ra khi tạo yêu cầu tài liệu'
      };
    }
  }
}

export const documentsService = new DocumentsService();
