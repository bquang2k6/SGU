# 📋 Danh Sách API (Lỗi hoặc Cần Kiểm Tra)

Dưới đây là danh sách các API hiện tại có vấn đề hoặc cần được xác minh trong hệ thống.

---

### 🔍 Xem môn học có thể đăng ký  
**Lỗi:** `400` `{"error": "Student matching query does not exist."}`
**Phương thức:** `GET`  
**Endpoint:** `/api/services/registration/available-courses/{student_id}/`

---

### 📅 Xem lịch học của tôi  
**Lỗi:** `404`
**Phương thức:** `GET`  
**Endpoint:** `/api/student/my-schedule/`

---

### 🧾 Xem danh sách đăng ký của tôi  
**Lỗi:** `404`
**Phương thức:** `GET`  
**Endpoint:** `/api/student/my-registrations/`

---

### 📚 Xem yêu cầu tài liệu của tôi 
**Lỗi:** `404` 
**Phương thức:** `GET`  
**Endpoint:** `/api/student/my-document-requests/`

---

### 🗂️ Xem loại tài liệu có thể yêu cầu  
**Lỗi:** `404`
**Phương thức:** `GET`  
**Endpoint:** `/api/crud/document-types/`

---

### 🔔 Xem tất cả thông báo  
**Lỗi:** `404`
**Phương thức:** `GET`  
**Endpoint:** `/api/student/my-notifications/`

---

### 👤 Xem thông tin cá nhân 
**Lỗi:** `404` 
**Phương thức:** `GET`  
**Endpoint:** `/api/student/profile/`

---

### ✏️ Cập nhật thông tin cá nhân  
**Lỗi:** `404`
**Phương thức:** `PUT`  
**Endpoint:** `/api/student/profile/update/`

---

### 💰 Xem học phí của tôi  
**Lỗi:** `404`
**Phương thức:** `GET`  
**Endpoint:** `/api/student/my-tuition-fees/`

---
###  Xem danh sách khoa 
**Lỗi:** `403`
**Phương thức:** `GET`  
**Endpoint:** `/api/crud/departments/`

---