export interface AttendanceStats {
  userId: string;
  userName: string;
  totalAttendances: number;
  totalDelays: number;
  totalOnline: number;
  firstAttendanceDate: string | null;
  lastAttendanceDate: string | null;
}
