# Hướng dẫn Debug API

## Vấn đề: API không gửi request

### 1. Kiểm tra Session Key
Mở Developer Tools (F12) và kiểm tra trong Console:
```javascript
// Kiểm tra session key có được lưu không
console.log('Session Key:', localStorage.getItem('sgu_session_key'));

// Kiểm tra user data
console.log('User Data:', localStorage.getItem('sgu_user'));
```

### 2. Kiểm tra Network Tab
1. Mở Developer Tools (F12)
2. Vào tab "Network"
3. Thử đăng nhập và xem có request nào được gửi không
4. Kiểm tra:
   - URL có đúng không: `http://127.0.0.1:8000/api/auth/student/login/`
   - Headers có đúng không
   - Response status code

### 3. Kiểm tra Console Errors
Xem có lỗi nào trong Console không:
- CORS errors
- Network errors
- JavaScript errors

### 4. Kiểm tra Backend
Đảm bảo backend đang chạy:
```bash
# Kiểm tra backend có chạy không
curl http://127.0.0.1:8000/api/auth/student/login/ -X POST -H "Content-Type: application/json" -d '{"username":"test","password":"test"}'
```

### 5. Các bước debug cụ thể

#### Bước 1: Kiểm tra đăng nhập
Thêm console.log vào LoginPage.jsx:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  console.log('Form data:', formData); // Thêm dòng này
  
  if (!formData.username || !formData.password) {
    toast.error('Vui lòng điền đầy đủ thông tin');
    return;
  }

  setIsLoading(true);
  
  try {
    console.log('Calling authService.login...'); // Thêm dòng này
    const result = await authService.login(formData.username, formData.password);
    console.log('Login result:', result); // Thêm dòng này
    
    if (result.success) {
      toast.success(result.message);
      onLoginSuccess?.(result.user);
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    console.error('Login error:', error);
    toast.error('Có lỗi xảy ra khi đăng nhập');
  } finally {
    setIsLoading(false);
  }
};
```

#### Bước 2: Kiểm tra API Service
Thêm console.log vào authService.js:
```javascript
async login(username, password) {
  try {
    console.log('Making request to:', API_ENDPOINTS.LOGIN); // Thêm dòng này
    console.log('Request body:', { username, password }); // Thêm dòng này
    
    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    console.log('Response status:', response.status); // Thêm dòng này
    console.log('Response ok:', response.ok); // Thêm dòng này

    if (!response.ok) {
      const errorData = await response.json();
      console.log('Error data:', errorData); // Thêm dòng này
      throw new Error(errorData.message || 'Đăng nhập thất bại');
    }

    const data = await response.json();
    console.log('Response data:', data); // Thêm dòng này
    
    // ... rest of the code
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: error.message || 'Có lỗi xảy ra khi đăng nhập'
    };
  }
}
```

#### Bước 3: Kiểm tra API Configuration
Thêm console.log vào api.js:
```javascript
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
  TIMEOUT: 10000
};

console.log('API Base URL:', API_CONFIG.BASE_URL); // Thêm dòng này
```

### 6. Các lỗi thường gặp

#### Lỗi CORS
Nếu thấy lỗi CORS, cần cấu hình backend để cho phép CORS từ frontend.

#### Lỗi 404
- Kiểm tra URL có đúng không
- Kiểm tra backend có chạy không
- Kiểm tra endpoint có tồn tại không

#### Lỗi 500
- Kiểm tra backend logs
- Kiểm tra database connection
- Kiểm tra request data format

#### Không có request nào được gửi
- Kiểm tra JavaScript errors
- Kiểm tra event handlers
- Kiểm tra form submission

### 7. Test API trực tiếp
Sử dụng Postman hoặc curl để test API:
```bash
curl -X POST http://127.0.0.1:8000/api/auth/student/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"student1","password":"python123"}'
```

### 8. Kiểm tra Environment Variables
Tạo file `.env` trong root directory:
```
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Sau đó restart development server.
