export const UserRole = {
  STUDENT: 'student',
  ADMIN: 'admin',
  TEACHER: 'teacher'
};

export const UserStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended'
};

export class User {
  constructor({
    id,
    studentId,
    fullName,
    email,
    phone,
    dateOfBirth,
    address,
    major,
    className,
    year,
    role = UserRole.STUDENT,
    status = UserStatus.ACTIVE,
    avatar,
    createdAt,
    updatedAt
  }) {
    this.id = id;
    this.studentId = studentId;
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.dateOfBirth = dateOfBirth;
    this.address = address;
    this.major = major;
    this.class = className;
    this.year = year;
    this.role = role;
    this.status = status;
    this.avatar = avatar;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class AuthStorage {
  static isLoggedIn() {
    return localStorage.getItem('sgu_user') !== null;
  }

  static getCurrentUser() {
    const userData = localStorage.getItem('sgu_user');
    return userData ? JSON.parse(userData) : null;
  }

  static setCurrentUser(user) {
    localStorage.setItem('sgu_user', JSON.stringify(user));
  }

  static logout() {
    localStorage.removeItem('sgu_user');
  }
}
