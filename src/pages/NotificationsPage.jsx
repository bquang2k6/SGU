import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Bell, CheckCircle, AlertCircle, Info, XCircle, Filter, Search } from 'lucide-react';

const NotificationsPage = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [filter, setFilter] = useState('all');

  // Mock data - trong thực tế sẽ lấy từ API
  const notifications = [
    {
      id: 1,
      title: 'Thông báo lịch thi cuối kỳ',
      message: 'Lịch thi cuối kỳ học kỳ 1 năm học 2024-2025 đã được công bố. Vui lòng kiểm tra lịch thi của bạn.',
      type: 'info',
      isImportant: true,
      isRead: false,
      createdAt: '2024-10-25T10:30:00Z',
      category: 'exam'
    },
    {
      id: 2,
      title: 'Cập nhật điểm số môn Lập trình Web',
      message: 'Điểm số môn Lập trình Web đã được cập nhật. Bạn có thể xem chi tiết trong phần điểm số.',
      type: 'success',
      isImportant: false,
      isRead: false,
      createdAt: '2024-10-24T14:20:00Z',
      category: 'grade'
    },
    {
      id: 3,
      title: 'Thông báo nghỉ học',
      message: 'Ngày mai (26/10/2024) sẽ nghỉ học do lễ hội. Các lớp học sẽ được bù vào tuần sau.',
      type: 'warning',
      isImportant: true,
      isRead: true,
      createdAt: '2024-10-23T16:45:00Z',
      category: 'schedule'
    },
    {
      id: 4,
      title: 'Yêu cầu giấy tờ đã được duyệt',
      message: 'Yêu cầu giấy chứng nhận sinh viên của bạn đã được duyệt. Bạn có thể tải xuống tại đây.',
      type: 'success',
      isImportant: false,
      isRead: true,
      createdAt: '2024-10-22T09:15:00Z',
      category: 'document'
    },
    {
      id: 5,
      title: 'Cảnh báo thiếu học phí',
      message: 'Bạn chưa thanh toán học phí học kỳ 1. Vui lòng thanh toán trước ngày 30/10/2024.',
      type: 'error',
      isImportant: true,
      isRead: false,
      createdAt: '2024-10-21T11:00:00Z',
      category: 'payment'
    }
  ];

  const categories = [
    { id: 'all', label: 'Tất cả', count: notifications.length },
    { id: 'exam', label: 'Thi cử', count: notifications.filter(n => n.category === 'exam').length },
    { id: 'grade', label: 'Điểm số', count: notifications.filter(n => n.category === 'grade').length },
    { id: 'schedule', label: 'Lịch học', count: notifications.filter(n => n.category === 'schedule').length },
    { id: 'document', label: 'Giấy tờ', count: notifications.filter(n => n.category === 'document').length },
    { id: 'payment', label: 'Thanh toán', count: notifications.filter(n => n.category === 'payment').length }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'info': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'success': return 'Thành công';
      case 'warning': return 'Cảnh báo';
      case 'error': return 'Lỗi';
      case 'info': return 'Thông tin';
      default: return 'Khác';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Vừa xong';
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    if (diffInHours < 48) return 'Hôm qua';
    return date.toLocaleDateString('vi-VN');
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.category === filter);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Thông báo
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Xem và quản lý thông báo từ trường
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Lọc
          </Button>
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Tìm kiếm
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng thông báo</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {notifications.length}
                </p>
              </div>
              <Bell className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Chưa đọc</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {unreadCount}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Quan trọng</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {notifications.filter(n => n.isImportant).length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đã đọc</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {notifications.filter(n => n.isRead).length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              onClick={() => setFilter(category.id)}
            >
              {category.label} ({category.count})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={filter} className="space-y-4">
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`hover:shadow-lg transition-shadow cursor-pointer ${
                  !notification.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20' : ''
                }`}
                onClick={() => setSelectedNotification(notification)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-semibold ${
                          !notification.isRead ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {notification.isImportant && (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                              Quan trọng
                            </Badge>
                          )}
                          <Badge className={getTypeColor(notification.type)}>
                            {getTypeText(notification.type)}
                          </Badge>
                        </div>
                      </div>
                      <p className={`text-sm mb-2 ${
                        !notification.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(notification.createdAt)}
                        </span>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getTypeIcon(selectedNotification.type)}
                  <div>
                    <CardTitle>{selectedNotification.title}</CardTitle>
                    <CardDescription>
                      {formatDate(selectedNotification.createdAt)}
                    </CardDescription>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedNotification(null)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Badge className={getTypeColor(selectedNotification.type)}>
                  {getTypeText(selectedNotification.type)}
                </Badge>
                {selectedNotification.isImportant && (
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                    Quan trọng
                  </Badge>
                )}
                {!selectedNotification.isRead && (
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    Chưa đọc
                  </Badge>
                )}
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  {selectedNotification.message}
                </p>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    ID thông báo: #{selectedNotification.id}
                  </div>
                  <div className="flex space-x-2">
                    {!selectedNotification.isRead && (
                      <Button size="sm" variant="outline">
                        Đánh dấu đã đọc
                      </Button>
                    )}
                    <Button size="sm">
                      Thực hiện hành động
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
