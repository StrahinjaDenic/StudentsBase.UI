export interface Exam {
  id: number;
  studentId: number; //index: number ali bi trebalo da stoji index zbog dodavanja novih
  courseId: string;
  examinationDateId: number;
  mark: string;
  grade: number;
  examDate: Date;
  points: number;
  index: number;
  courseName: string;
}
