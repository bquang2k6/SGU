import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { scheduleService } from '../services/scheduleService';
import { toast } from 'react-hot-toast';

const SchedulePage = () => {
  const [mySchedule, setMySchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAllWeeks, setShowAllWeeks] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();

  useEffect(() => {
    fetchScheduleData();
  }, []);

  const fetchScheduleData = async () => {
    try {
      setLoading(true);
      const result = await scheduleService.getMySchedule();
      if (result.success) {
        const data = result.data || [];
        setMySchedule(data);

        // tự động mở chi tiết hôm nay nếu có lịch
        const todayStr = today.toISOString().split('T')[0];
        const todayItem = data.find(item => item.datetime?.startsWith(todayStr));
        if (todayItem) {
          setSelectedDate({ date: today, dateString: todayStr });
        }
      }
    } catch (error) {
      console.error('Lỗi tải lịch học:', error);
      toast.error('Có lỗi xảy ra khi tải lịch học');
    } finally {
      setLoading(false);
    }
  };

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const totalDays = endOfMonth.getDate();

  const days = Array.from({ length: totalDays }, (_, i) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
    const dateString = date.toISOString().split('T')[0];
    const hasClass = mySchedule.some(item => item.datetime?.startsWith(dateString));
    return { date, dateString, hasClass };
  });

  // Chia tháng thành các tuần
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  // Lấy tuần hiện tại
  const currentWeekIndex = weeks.findIndex(week =>
    week.some(day => day.date.toDateString() === today.toDateString())
  );
  const visibleWeeks = showAllWeeks ? weeks : [weeks[currentWeekIndex] || weeks[0]];

  const selectedCourses = selectedDate
  ? mySchedule.filter(item => item.datetime?.startsWith(selectedDate.dateString))
    : [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-black">Lịch học</h1>
        <Button variant="outline" onClick={fetchScheduleData}>
          <Calendar className="h-4 w-4 mr-2" /> Làm mới
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải lịch học...</p>
        </div>
      ) : (
        <>
          {/* Lịch dạng tuần */}
          <Card className="p-4">
          <CardHeader className="p-0">
            <div className="flex items-center justify-center space-x-4 py-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setCurrentMonth(
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
                  )
                }
              >
                ←
              </Button>

              <CardTitle className="text-lg font-semibold text-center min-w-[180px]">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </CardTitle>

              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setCurrentMonth(
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
                  )
                }
              >
                →
              </Button>
            </div>
          </CardHeader>

            <CardContent>
              <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-500 mb-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              <div className="space-y-2">
                {visibleWeeks.map((week, wi) => (
                  <div key={wi} className="grid grid-cols-7 gap-2">
                    {week.map((day) => (
                      <button
                        key={day.dateString}
                        onClick={() => setSelectedDate(day)}
                        className={`relative p-2 rounded-full transition-all ${
                          selectedDate?.dateString === day.dateString
                            ? 'bg-blue-600 text-white'
                            : day.date.toDateString() === today.toDateString()
                            ? 'bg-blue-100 text-blue-800 font-semibold'
                            : 'hover:bg-blue-50'
                        }`}
                      >
                        {day.date.getDate()}
                        {day.hasClass && (
                          <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                ))}
              </div>

              {/* Nút mở rộng */}
              <div className="text-center mt-4">
                <Button variant="outline" size="sm" onClick={() => setShowAllWeeks(!showAllWeeks)}>
                  {showAllWeeks ? 'Thu gọn lịch' : 'Xem thêm lịch'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Chi tiết */}
          {selectedDate && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>
                  {selectedDate.date.getDate()} tháng {selectedDate.date.getMonth() + 1},{' '}
                  {selectedDate.date.getFullYear()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedCourses.length > 0 ? (
                  selectedCourses.map((course, i) => (
                    <div
                      key={i}
                      className="border-b border-gray-200 pb-3 mb-3 last:border-0 last:mb-0"
                    >
                      <h4 className="font-semibold text-gray-900">{course.courseName}</h4>
                      <p className="text-sm text-gray-600">{course.courseCode}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock className="h-4 w-4 mr-1" /> {course.startTime} - {course.endTime}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" /> {course.room}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" /> {course.teacher}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Không có lịch học trong ngày này.</p>
                )}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default SchedulePage;
