# SGU Dashboard

Hệ thống quản lý sinh viên SGU với giao diện hiện đại và đầy đủ chức năng.

## 🚀 Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Tạo file `.env.local` trong thư mục gốc:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_API_AUTH_ENDPOINT=/api/auth/student/login/
```

3. Chạy ứng dụng:
```bash
npm run dev
```

## 🔧 Cấu hình API

Ứng dụng sử dụng các biến môi trường để cấu hình API:

- `VITE_API_BASE_URL`: URL gốc của API backend
- `VITE_API_AUTH_ENDPOINT`: Endpoint đăng nhập

## 📱 Chức năng

- **Đăng nhập**: Tích hợp với API đăng nhập sinh viên
- **Xem lớp học**: Quản lý lịch học và thời khóa biểu
- **Xem điểm**: Theo dõi điểm số và kết quả học tập
- **Đăng ký giấy**: Đăng ký các loại giấy tờ cần thiết
- **Thông báo**: Xem thông báo từ trường
- **Thông tin cá nhân**: Quản lý profile và đổi mật khẩu
- **Tiến độ học**: Theo dõi tiến độ học tập và thành tích

## 🎨 Giao diện

- Giao diện màu trắng sạch sẽ
- Responsive design
- Modern UI với animations
- Sidebar navigation

## 🔐 API Endpoints

### Đăng nhập
```
POST /api/auth/student/login/
Content-Type: application/json

{
    "username": "string",
    "password": "string"
}
```

## 🛠️ Công nghệ

- React 19
- Vite
- Tailwind CSS
- Radix UI
- Lucide React
- React Hot Toast