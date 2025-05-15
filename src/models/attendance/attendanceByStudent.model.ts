export interface AttendanceByStudent {
  studentId: number;
  fullName: string;
  totalClasses: number;
  attendedClasses: number;
  missedClasses: number;
  attendancePercentage: number;
}
