import { SessionAttendance } from "./session-attendance";

export interface AttendanceView {
     studentId: number;
  studentName: string;
  attendance: SessionAttendance[];
}
