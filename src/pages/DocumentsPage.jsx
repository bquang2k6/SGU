import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { FileText, Download, Upload, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const DocumentsPage = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Mock data - trong thực tế sẽ lấy từ API
  const documentTypes = [
    {
      id: 1,
      name: 'Giấy chứng nhận sinh viên',
      description: 'Giấy chứng nhận tư cách sinh viên đang học tại trường',
      required: true,
      processingTime: '3-5 ngày làm việc',
      fee: 0,
      status: 'available'
    },
    {
      id: 2,
      name: 'Bảng điểm',
      description: 'Bảng điểm chi tiết các môn học đã hoàn thành',
      required: false,
      processingTime: '2-3 ngày làm việc',
      fee: 0,
      status: 'available'
    },
    {
      id: 3,
      name: 'Giấy xác nhận tốt nghiệp',
      description: 'Giấy xác nhận đã hoàn thành chương trình học',
      required: false,
      processingTime: '7-10 ngày làm việc',
      fee: 50000,
      status: 'available'
    },
    {
      id: 4,
      name: 'Giấy chuyển trường',
      description: 'Giấy chuyển trường cho sinh viên muốn chuyển sang trường khác',
      required: false,
      processingTime: '5-7 ngày làm việc',
      fee: 100000,
      status: 'available'
    }
  ];

  const myRequests = [
    {
      id: 1,
      documentType: 'Giấy chứng nhận sinh viên',
      requestDate: '2024-10-20',
      status: 'approved',
      processedDate: '2024-10-23',
      downloadUrl: '#'
    },
    {
      id: 2,
      documentType: 'Bảng điểm',
      requestDate: '2024-10-25',
      status: 'processing',
      processedDate: null,
      downloadUrl: null
    },
    {
      id: 3,
      documentType: 'Giấy xác nhận tốt nghiệp',
      requestDate: '2024-10-15',
      status: 'rejected',
      processedDate: '2024-10-18',
      downloadUrl: null,
      rejectionReason: 'Thiếu thông tin cần thiết'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'approved': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Đã duyệt';
      case 'processing': return 'Đang xử lý';
      case 'rejected': return 'Từ chối';
      default: return 'Chưa xác định';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Đăng ký giấy tờ
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Đăng ký và theo dõi các loại giấy tờ cần thiết
          </p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Đăng ký mới
        </Button>
      </div>

      <Tabs defaultValue="types" className="space-y-4">
        <TabsList>
          <TabsTrigger value="types">Loại giấy tờ</TabsTrigger>
          <TabsTrigger value="requests">Yêu cầu của tôi</TabsTrigger>
          <TabsTrigger value="history">Lịch sử</TabsTrigger>
        </TabsList>

        <TabsContent value="types" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentTypes.map((docType) => (
              <Card 
                key={docType.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedDocument(docType)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{docType.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {docType.description}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(docType.status)}>
                      {docType.status === 'available' ? 'Có sẵn' : docType.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Thời gian xử lý:</span>
                    <span className="text-gray-900 dark:text-white">{docType.processingTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Phí:</span>
                    <span className="text-gray-900 dark:text-white">
                      {docType.fee === 0 ? 'Miễn phí' : `${docType.fee.toLocaleString()} VNĐ`}
                    </span>
                  </div>
                  {docType.required && (
                    <Badge variant="outline" className="text-red-600 border-red-600">
                      Bắt buộc
                    </Badge>
                  )}
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <Button className="w-full" size="sm">
                      Đăng ký
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Yêu cầu của tôi</CardTitle>
              <CardDescription>
                Theo dõi trạng thái các yêu cầu giấy tờ đã gửi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {request.documentType}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Ngày yêu cầu: {request.requestDate}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(request.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(request.status)}
                            <span>{getStatusText(request.status)}</span>
                          </div>
                        </Badge>
                      </div>
                    </div>
                    
                    {request.processedDate && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Ngày xử lý: {request.processedDate}
                      </p>
                    )}
                    
                    {request.rejectionReason && (
                      <div className="mb-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
                        <p className="text-sm text-red-600 dark:text-red-400">
                          <strong>Lý do từ chối:</strong> {request.rejectionReason}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        ID yêu cầu: #{request.id}
                      </div>
                      {request.downloadUrl && (
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Tải xuống
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử đăng ký</CardTitle>
              <CardDescription>
                Xem lịch sử tất cả các yêu cầu giấy tờ đã gửi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Lịch sử đăng ký sẽ được hiển thị ở đây</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Document Detail Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedDocument.name}</CardTitle>
                  <CardDescription>{selectedDocument.description}</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedDocument(null)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Thời gian xử lý</label>
                  <p className="text-gray-900 dark:text-white">{selectedDocument.processingTime}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phí</label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedDocument.fee === 0 ? 'Miễn phí' : `${selectedDocument.fee.toLocaleString()} VNĐ`}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Trạng thái</label>
                  <Badge className={getStatusColor(selectedDocument.status)}>
                    {selectedDocument.status === 'available' ? 'Có sẵn' : selectedDocument.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Bắt buộc</label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedDocument.required ? 'Có' : 'Không'}
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Hướng dẫn đăng ký:
                </h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>Điền đầy đủ thông tin yêu cầu</li>
                  <li>Kiểm tra lại thông tin trước khi gửi</li>
                  <li>Chờ xử lý và thông báo kết quả</li>
                  <li>Tải xuống giấy tờ khi được duyệt</li>
                </ol>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button className="flex-1">
                  Đăng ký ngay
                </Button>
                <Button variant="outline" onClick={() => setSelectedDocument(null)}>
                  Hủy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;
