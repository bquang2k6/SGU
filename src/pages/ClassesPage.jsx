import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BookOpen, Clock, MapPin, User, Calendar, ChevronRight } from 'lucide-react';

const ClassesPage = () => {
  const [selectedClass, setSelectedClass] = useState(null);

  // Mock data - trong thực tế sẽ lấy từ API
  const classes = [
    {
      id: 1,
      name: 'Lập trình Web',
      code: 'CS101',
      teacher: 'Nguyễn Văn A',
      room: 'A101',
      schedule: [
        { day: 'Thứ 2', time: '08:00 - 10:00' },
        { day: 'Thứ 4', time: '08:00 - 10:00' }
      ],
      semester: 'HK1 2024-2025',
      credits: 3,
      status: 'active'
    },
    {
      id: 2,
      name: 'Cơ sở dữ liệu',
      code: 'CS102',
      teacher: 'Trần Thị B',
      room: 'B201',
      schedule: [
        { day: 'Thứ 3', time: '10:00 - 12:00' },
        { day: 'Thứ 5', time: '10:00 - 12:00' }
      ],
      semester: 'HK1 2024-2025',
      credits: 3,
      status: 'active'
    },
    {
      id: 3,
      name: 'Toán cao cấp',
      code: 'MATH101',
      teacher: 'Lê Văn C',
      room: 'C301',
      schedule: [
        { day: 'Thứ 2', time: '14:00 - 16:00' },
        { day: 'Thứ 6', time: '14:00 - 16:00' }
      ],
      semester: 'HK1 2024-2025',
      credits: 4,
      status: 'active'
    }
  ];

  const todaySchedule = [
    { time: '08:00', subject: 'Lập trình Web', room: 'A101', teacher: 'Nguyễn Văn A' },
    { time: '10:00', subject: 'Cơ sở dữ liệu', room: 'B201', teacher: 'Trần Thị B' },
    { time: '14:00', subject: 'Toán cao cấp', room: 'C301', teacher: 'Lê Văn C' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Lớp học của tôi
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Quản lý và theo dõi các lớp học đang tham gia
          </p>
        </div>
        <Button>
          <BookOpen className="h-4 w-4 mr-2" />
          Thêm lớp học
        </Button>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Danh sách lớp</TabsTrigger>
          <TabsTrigger value="schedule">Lịch học hôm nay</TabsTrigger>
          <TabsTrigger value="calendar">Lịch tuần</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem) => (
              <Card 
                key={classItem.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedClass(classItem)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{classItem.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {classItem.code} • {classItem.credits} tín chỉ
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(classItem.status)}>
                      {classItem.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <User className="h-4 w-4" />
                    <span>{classItem.teacher}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>{classItem.room}</span>
                  </div>
                  <div className="space-y-1">
                    {classItem.schedule.map((schedule, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span>{schedule.day}: {schedule.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {classItem.semester}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Lịch học hôm nay</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                        {item.time}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {item.subject}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {item.room} • {item.teacher}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lịch tuần</CardTitle>
              <CardDescription>
                Xem lịch học trong tuần hiện tại
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Lịch tuần sẽ được hiển thị ở đây</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Class Detail Modal */}
      {selectedClass && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedClass.name}</CardTitle>
                  <CardDescription>{selectedClass.code}</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedClass(null)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Giảng viên</label>
                  <p className="text-gray-900 dark:text-white">{selectedClass.teacher}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phòng học</label>
                  <p className="text-gray-900 dark:text-white">{selectedClass.room}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Tín chỉ</label>
                  <p className="text-gray-900 dark:text-white">{selectedClass.credits}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Học kỳ</label>
                  <p className="text-gray-900 dark:text-white">{selectedClass.semester}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Lịch học</label>
                <div className="mt-2 space-y-2">
                  {selectedClass.schedule.map((schedule, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{schedule.day}: {schedule.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ClassesPage;
