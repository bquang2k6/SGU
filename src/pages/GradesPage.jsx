import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Award, TrendingUp, BookOpen, Calendar, Download, Eye } from 'lucide-react';

const GradesPage = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Mock data - trong thực tế sẽ lấy từ API
  const subjects = [
    {
      id: 1,
      name: 'Lập trình Web',
      code: 'CS101',
      credits: 3,
      finalGrade: 8.5,
      letterGrade: 'B+',
      semester: 'HK1 2024-2025',
      grades: [
        { type: 'Giữa kỳ', score: 8.0, maxScore: 10, weight: 30, date: '2024-10-15' },
        { type: 'Cuối kỳ', score: 9.0, maxScore: 10, weight: 50, date: '2024-12-20' },
        { type: 'Bài tập', score: 8.5, maxScore: 10, weight: 20, date: '2024-11-30' }
      ]
    },
    {
      id: 2,
      name: 'Cơ sở dữ liệu',
      code: 'CS102',
      credits: 3,
      finalGrade: 7.8,
      letterGrade: 'B',
      semester: 'HK1 2024-2025',
      grades: [
        { type: 'Giữa kỳ', score: 7.5, maxScore: 10, weight: 30, date: '2024-10-20' },
        { type: 'Cuối kỳ', score: 8.0, maxScore: 10, weight: 50, date: '2024-12-25' },
        { type: 'Thực hành', score: 8.0, maxScore: 10, weight: 20, date: '2024-12-10' }
      ]
    },
    {
      id: 3,
      name: 'Toán cao cấp',
      code: 'MATH101',
      credits: 4,
      finalGrade: 9.2,
      letterGrade: 'A',
      semester: 'HK1 2024-2025',
      grades: [
        { type: 'Giữa kỳ', score: 9.0, maxScore: 10, weight: 30, date: '2024-10-25' },
        { type: 'Cuối kỳ', score: 9.5, maxScore: 10, weight: 50, date: '2024-12-30' },
        { type: 'Bài tập', score: 9.0, maxScore: 10, weight: 20, date: '2024-12-05' }
      ]
    }
  ];

  const overallStats = {
    gpa: 8.5,
    totalCredits: 10,
    completedCredits: 10,
    averageGrade: 8.5
  };

  const getGradeColor = (grade) => {
    if (grade >= 9) return 'text-green-600 dark:text-green-400';
    if (grade >= 8) return 'text-blue-600 dark:text-blue-400';
    if (grade >= 7) return 'text-yellow-600 dark:text-yellow-400';
    if (grade >= 6) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getGradeBadgeColor = (letterGrade) => {
    switch (letterGrade) {
      case 'A': case 'A+': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'B': case 'B+': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'C': case 'C+': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'D': case 'D+': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'F': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Điểm và kết quả học tập
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Theo dõi điểm số và kết quả học tập của bạn
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Xuất bảng điểm
        </Button>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">GPA</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {overallStats.gpa}
                </p>
              </div>
              <Award className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tín chỉ đã hoàn thành</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {overallStats.completedCredits}/{overallStats.totalCredits}
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Điểm trung bình</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {overallStats.averageGrade}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Môn học</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {subjects.length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subjects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subjects">Môn học</TabsTrigger>
          <TabsTrigger value="detailed">Chi tiết điểm</TabsTrigger>
          <TabsTrigger value="transcript">Bảng điểm</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Card 
                key={subject.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedSubject(subject)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {subject.code} • {subject.credits} tín chỉ
                      </CardDescription>
                    </div>
                    <Badge className={getGradeBadgeColor(subject.letterGrade)}>
                      {subject.letterGrade}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Điểm cuối kỳ</span>
                    <span className={`text-2xl font-bold ${getGradeColor(subject.finalGrade)}`}>
                      {subject.finalGrade}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {subject.semester}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Xem chi tiết</span>
                    <Eye className="h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chi tiết điểm số</CardTitle>
              <CardDescription>
                Xem chi tiết điểm số của từng môn học
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {subjects.map((subject) => (
                  <div key={subject.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {subject.name} ({subject.code})
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {subject.semester}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getGradeColor(subject.finalGrade)}`}>
                          {subject.finalGrade}
                        </div>
                        <Badge className={getGradeBadgeColor(subject.letterGrade)}>
                          {subject.letterGrade}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {subject.grades.map((grade, index) => (
                        <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {grade.type}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              ({grade.weight}%)
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`font-semibold ${getGradeColor(grade.score)}`}>
                              {grade.score}/{grade.maxScore}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {grade.date}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transcript" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bảng điểm</CardTitle>
              <CardDescription>
                Bảng điểm tổng hợp tất cả các môn học
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Môn học</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Mã môn</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Tín chỉ</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Điểm</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Xếp loại</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject) => (
                      <tr key={subject.id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-3 px-4 text-gray-900 dark:text-white">{subject.name}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{subject.code}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{subject.credits}</td>
                        <td className={`py-3 px-4 font-semibold ${getGradeColor(subject.finalGrade)}`}>
                          {subject.finalGrade}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getGradeBadgeColor(subject.letterGrade)}>
                            {subject.letterGrade}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Subject Detail Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedSubject.name}</CardTitle>
                  <CardDescription>{selectedSubject.code} • {selectedSubject.semester}</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedSubject(null)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Tín chỉ</label>
                  <p className="text-gray-900 dark:text-white">{selectedSubject.credits}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Điểm cuối kỳ</label>
                  <p className={`text-2xl font-bold ${getGradeColor(selectedSubject.finalGrade)}`}>
                    {selectedSubject.finalGrade}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Chi tiết điểm</label>
                <div className="mt-2 space-y-2">
                  {selectedSubject.grades.map((grade, index) => (
                    <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {grade.type}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          ({grade.weight}%)
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold ${getGradeColor(grade.score)}`}>
                          {grade.score}/{grade.maxScore}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {grade.date}
                        </span>
                      </div>
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

export default GradesPage;
