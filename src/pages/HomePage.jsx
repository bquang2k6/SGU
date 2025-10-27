import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BookOpen, Award, FileText, Bell, User, TrendingUp, Calendar, Clock } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      id: 'classes',
      title: 'Xem lớp học',
      description: 'Xem thông tin lớp học, lịch học và thời khóa biểu',
      icon: BookOpen,
      color: 'bg-blue-500',
      href: '/classes'
    },
    {
      id: 'grades',
      title: 'Xem điểm và kết quả học tập',
      description: 'Theo dõi điểm số, kết quả học tập và bảng điểm',
      icon: Award,
      color: 'bg-green-500',
      href: '/grades'
    },
    {
      id: 'documents',
      title: 'Đăng ký giấy',
      description: 'Đăng ký các loại giấy tờ cần thiết cho sinh viên',
      icon: FileText,
      color: 'bg-orange-500',
      href: '/documents'
    },
    {
      id: 'notifications',
      title: 'Nhận thông báo',
      description: 'Xem thông báo mới và cập nhật từ trường',
      icon: Bell,
      color: 'bg-purple-500',
      href: '/notifications'
    },
    {
      id: 'profile',
      title: 'Cập nhật thông tin cá nhân',
      description: 'Quản lý thông tin cá nhân và đổi mật khẩu',
      icon: User,
      color: 'bg-pink-500',
      href: '/profile'
    },
    {
      id: 'progress',
      title: 'Theo dõi tiến độ học',
      description: 'Theo dõi tiến độ học tập và thành tích cá nhân',
      icon: TrendingUp,
      color: 'bg-indigo-500',
      href: '/progress'
    }
  ];

  const stats = [
    { label: 'Lớp học đang tham gia', value: '5', icon: BookOpen },
    { label: 'Điểm trung bình', value: '8.5', icon: Award },
    { label: 'Thông báo chưa đọc', value: '3', icon: Bell },
    { label: 'Giấy tờ đã đăng ký', value: '12', icon: FileText }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Chào mừng đến với Student
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Quản lý học tập và thông tin sinh viên một cách dễ dàng và hiệu quả
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                  </div>
                  <Icon className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Các chức năng chính
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${feature.color} text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Thao tác nhanh</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Calendar className="h-6 w-6" />
              <span>Xem lịch học hôm nay</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Award className="h-6 w-6" />
              <span>Xem điểm mới nhất</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Bell className="h-6 w-6" />
              <span>Thông báo mới</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
