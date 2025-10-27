# Hướng dẫn sử dụng API Services

## Tổng quan
Dự án đã được cập nhật để hỗ trợ tất cả các API endpoints từ backend. Tất cả API đều sử dụng Session Key authentication.

## Cấu hình API
- **Base URL**: `http://127.0.0.1:8000/api/`
- **Authentication**: Session Key được lưu trong localStorage với key `sgu_session_key`

## Các Services có sẵn

### 1. AuthService
```javascript
import { authService } from './services';

// Đăng nhập
const result = await authService.login('username', 'password');

// Đăng xuất
await authService.logout();

// Đổi mật khẩu
await authService.changePassword('currentPassword', 'newPassword');

// Kiểm tra trạng thái đăng nhập
const isLoggedIn = authService.isAuthenticated();
```

### 2. GradesService
```javascript
import { gradesService } from './services';

// Lấy danh sách điểm
const grades = await gradesService.getMyGrades();

// Tính toán GPA
const gpa = await gradesService.calculateGPA('S001');
```

### 3. ClassesService
```javascript
import { classesService } from './services';

// Lấy danh sách lớp học
const classes = await classesService.getClasses();
```

### 4. DocumentsService
```javascript
import { documentsService } from './services';

// Lấy danh sách yêu cầu tài liệu
const requests = await documentsService.getDocumentRequests();

// Tạo yêu cầu tài liệu mới
const newRequest = await documentsService.createDocumentRequest({
  requestId: 'DOCREQ001',
  documentTypeId: 'DT001',
  semesterId: 'SEM001',
  purpose: 'Application for job',
  studentIds: ['S001']
});
```

### 5. NotificationsService
```javascript
import { notificationsService } from './services';

// Lấy thông báo chưa đọc
const notifications = await notificationsService.getUnreadNotifications();

// Đánh dấu thông báo đã đọc
await notificationsService.markNotificationAsRead('NOT001');
```

### 6. UserService
```javascript
import { userService } from './services';

// Cập nhật thông tin người dùng
await userService.updateUser('1', {
  full_name: 'Nguyen Van A',
  email: 'nguyenvana@example.com',
  phone: '0901234567'
});
```

### 7. ProgressService
```javascript
import { progressService } from './services';

// Lấy khóa học có thể đăng ký
const courses = await progressService.getAvailableCourses('S001');

// Kiểm tra điều kiện tiên quyết
const prerequisites = await progressService.checkPrerequisites('S001', 'SUB005');

// Lấy thông tin học phí
const tuitionFees = await progressService.getTuitionFees();
```

## Cách sử dụng trong Components

### Ví dụ: Lấy danh sách điểm trong GradesPage
```javascript
import React, { useState, useEffect } from 'react';
import { gradesService } from '../services';

const GradesPage = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      const result = await gradesService.getMyGrades();
      if (result.success) {
        setGrades(result.data);
      } else {
        console.error('Error:', result.message);
      }
      setLoading(false);
    };

    fetchGrades();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {grades.map(grade => (
        <div key={grade.gradeId}>
          <h3>{grade.subject}</h3>
          <p>Điểm trung bình: {grade.averageScore}</p>
          <p>Xếp loại: {grade.letterGrade}</p>
        </div>
      ))}
    </div>
  );
};
```

## Xử lý lỗi
Tất cả services đều trả về object với cấu trúc:
```javascript
{
  success: boolean,
  message?: string,
  data?: any
}
```

## Lưu ý
- Tất cả API calls đều tự động thêm Session Key vào headers
- Nếu Session Key hết hạn, cần đăng nhập lại
- Các services đã được xử lý error handling cơ bản
