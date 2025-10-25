import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { TrendingUp, Award, BookOpen, Calendar, Target, BarChart3, Download } from 'lucide-react';

const ProgressPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  // Mock data - trong thực tế sẽ lấy từ API
  const progressData = {
    current: {
      gpa: 8.5,
      creditsCompleted: 45,
      creditsTotal: 120,
      subjectsCompleted: 15,
      subjectsTotal: 40,
      attendanceRate: 95.5,
      averageGrade: 8.2
    },
    overall: {
      gpa: 8.3,
      creditsCompleted: 90,
      creditsTotal: 120,
      subjectsCompleted: 30,
      subjectsTotal: 40,
      attendanceRate: 94.2,
      averageGrade: 8.1
    }
  };

  const semesterProgress = [
    {
      semester: 'HK1 2021-2022',
      gpa: 8.0,
      credits: 15,
      subjects: 5,
      status: 'completed'
    },
    {
      semester: 'HK2 2021-2022',
      gpa: 8.2,
      credits: 15,
      subjects: 5,
      status: 'completed'
    },
    {
      semester: 'HK1 2022-2023',
      gpa: 8.5,
      credits: 15,
      subjects: 5,
      status: 'completed'
    },
    {
      semester: 'HK2 2022-2023',
      gpa: 8.3,
      credits: 15,
      subjects: 5,
      status: 'completed'
    },
    {
      semester: 'HK1 2023-2024',
      gpa: 8.7,
      credits: 15,
      subjects: 5,
      status: 'completed'
    },
    {
      semester: 'HK2 2023-2024',
      gpa: 8.4,
      credits: 15,
      subjects: 5,
      status: 'completed'
    },
    {
      semester: 'HK1 2024-2025',
      gpa: 8.5,
      credits: 15,
      subjects: 5,
      status: 'current'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Học sinh giỏi',
      description: 'Đạt danh hiệu học sinh giỏi học kỳ 1 năm 2024-2025',
      date: '2024-10-15',
      type: 'academic',
      status: 'earned'
    },
    {
      id: 2,
      title: 'Tham gia tích cực',
      description: 'Tham gia 100% các buổi học trong tháng',
      date: '2024-10-01',
      type: 'attendance',
      status: 'earned'
    },
    {
      id: 3,
      title: 'Điểm cao',
      description: 'Đạt điểm A+ trong 3 môn học liên tiếp',
      date: '2024-09-20',
      type: 'grade',
      status: 'earned'
    },
    {
      id: 4,
      title: 'Tốt nghiệp loại giỏi',
      description: 'Tốt nghiệp với GPA >= 8.0',
      date: null,
      type: 'graduation',
      status: 'pending'
    }
  ];

  const goals = [
    {
      id: 1,
      title: 'Duy trì GPA >= 8.5',
      description: 'Giữ điểm trung bình trên 8.5 trong học kỳ này',
      progress: 85,
      target: 100,
      deadline: '2024-12-31',
      status: 'in_progress'
    },
    {
      id: 2,
      title: 'Hoàn thành 120 tín chỉ',
      description: 'Hoàn thành đủ 120 tín chỉ để tốt nghiệp',
      progress: 75,
      target: 100,
      deadline: '2025-06-30',
      status: 'in_progress'
    },
    {
      id: 3,
      title: 'Tham gia 95% buổi học',
      description: 'Duy trì tỷ lệ tham gia lớp học trên 95%',
      progress: 95,
      target: 95,
      deadline: '2024-12-31',
      status: 'completed'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'current': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'earned': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Hoàn thành';
      case 'current': return 'Hiện tại';
      case 'earned': return 'Đã đạt';
      case 'pending': return 'Chờ đạt';
      case 'in_progress': return 'Đang thực hiện';
      default: return 'Chưa xác định';
    }
  };

  const getAchievementIcon = (type) => {
    switch (type) {
      case 'academic': return <Award className="h-5 w-5 text-yellow-500" />;
      case 'attendance': return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'grade': return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'graduation': return <BookOpen className="h-5 w-5 text-purple-500" />;
      default: return <Award className="h-5 w-5 text-gray-500" />;
    }
  };

  const currentData = progressData[selectedPeriod];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Theo dõi tiến độ học
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Theo dõi tiến độ học tập và thành tích của bạn
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Xuất báo cáo
        </Button>
      </div>

      {/* Period Selector */}
      <div className="flex space-x-2">
        <Button
          variant={selectedPeriod === 'current' ? 'default' : 'outline'}
          onClick={() => setSelectedPeriod('current')}
        >
          Học kỳ hiện tại
        </Button>
        <Button
          variant={selectedPeriod === 'overall' ? 'default' : 'outline'}
          onClick={() => setSelectedPeriod('overall')}
        >
          Tổng quan
        </Button>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">GPA</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentData.gpa}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tín chỉ</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentData.creditsCompleted}/{currentData.creditsTotal}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Môn học</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentData.subjectsCompleted}/{currentData.subjectsTotal}
                </p>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Điểm danh</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentData.attendanceRate}%
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="semester">Theo học kỳ</TabsTrigger>
          <TabsTrigger value="achievements">Thành tích</TabsTrigger>
          <TabsTrigger value="goals">Mục tiêu</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tiến độ tín chỉ</CardTitle>
                <CardDescription>
                  Tiến độ hoàn thành tín chỉ theo kế hoạch
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Đã hoàn thành
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {currentData.creditsCompleted}/{currentData.creditsTotal}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentData.creditsCompleted / currentData.creditsTotal) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Còn lại: {currentData.creditsTotal - currentData.creditsCompleted} tín chỉ
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tiến độ môn học</CardTitle>
                <CardDescription>
                  Tiến độ hoàn thành các môn học
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Đã hoàn thành
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {currentData.subjectsCompleted}/{currentData.subjectsTotal}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentData.subjectsCompleted / currentData.subjectsTotal) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Còn lại: {currentData.subjectsTotal - currentData.subjectsCompleted} môn
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="semester" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tiến độ theo học kỳ</CardTitle>
              <CardDescription>
                Xem tiến độ học tập qua các học kỳ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {semesterProgress.map((semester, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {semester.semester}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {semester.credits} tín chỉ • {semester.subjects} môn học
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(semester.status)}>
                          {getStatusText(semester.status)}
                        </Badge>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {semester.gpa}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                      <div 
                        className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${(semester.gpa / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thành tích</CardTitle>
              <CardDescription>
                Các thành tích và danh hiệu đã đạt được
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {getAchievementIcon(achievement.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {achievement.title}
                          </h3>
                          <Badge className={getStatusColor(achievement.status)}>
                            {getStatusText(achievement.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {achievement.description}
                        </p>
                        {achievement.date && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {achievement.date}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mục tiêu học tập</CardTitle>
              <CardDescription>
                Theo dõi tiến độ thực hiện các mục tiêu học tập
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {goals.map((goal) => (
                  <div key={goal.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {goal.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {goal.description}
                        </p>
                      </div>
                      <Badge className={getStatusColor(goal.status)}>
                        {getStatusText(goal.status)}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Tiến độ</span>
                        <span className="text-gray-900 dark:text-white">
                          {goal.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Hạn: {goal.deadline}</span>
                        <span>Mục tiêu: {goal.target}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressPage;
