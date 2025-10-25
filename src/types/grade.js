export const GradeType = {
  MIDTERM: 'midterm',
  FINAL: 'final',
  ASSIGNMENT: 'assignment',
  QUIZ: 'quiz',
  PROJECT: 'project',
  ATTENDANCE: 'attendance'
};

export const GradeStatus = {
  PENDING: 'pending',
  GRADED: 'graded',
  RELEASED: 'released'
};

export class Grade {
  constructor({
    id,
    studentId,
    subjectCode,
    subjectName,
    gradeType,
    score,
    maxScore,
    weight,
    status = GradeStatus.PENDING,
    teacherName,
    gradedAt,
    description,
    createdAt,
    updatedAt
  }) {
    this.id = id;
    this.studentId = studentId;
    this.subjectCode = subjectCode;
    this.subjectName = subjectName;
    this.gradeType = gradeType;
    this.score = score;
    this.maxScore = maxScore;
    this.weight = weight;
    this.status = status;
    this.teacherName = teacherName;
    this.gradedAt = gradedAt;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getPercentage() {
    return this.maxScore > 0 ? (this.score / this.maxScore) * 100 : 0;
  }

  getLetterGrade() {
    const percentage = this.getPercentage();
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  }
}

export class SubjectGrade {
  constructor({
    subjectCode,
    subjectName,
    grades = [],
    finalGrade,
    letterGrade,
    credits,
    semester,
    year
  }) {
    this.subjectCode = subjectCode;
    this.subjectName = subjectName;
    this.grades = grades;
    this.finalGrade = finalGrade;
    this.letterGrade = letterGrade;
    this.credits = credits;
    this.semester = semester;
    this.year = year;
  }
}
