// attendance.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AttendanceView } from '../../interfaces/attendance-view';

export interface StudentAttendance {
  sessionTitle: string;
  courseTitle: string;
  isPresent: boolean;
  checkedAt: string;
  studentName?: string;
}

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private apiUrl = 'https://localhost:7035/api/Attendance';

  constructor(private http: HttpClient) {}

  getByStudent(studentId: number): Observable<StudentAttendance[]> {
    return this.http.get<StudentAttendance[]>(`${this.apiUrl}/student/${studentId}`);
  }


  getAttendanceByCourse(courseId: number): Observable<AttendanceView[]> {
    return this.http.get<AttendanceView[]>(`https://localhost:7035/api/Attendance/attendance/course/${courseId}`);
  }

  // attendance.service.ts

updateAttendanceStatus(studentId: number, sessionId: number, isPresent: boolean) {
  const url = `https://localhost:7035/api/Attendance/update`;
  return this.http.put(url, { studentId, sessionId, isPresent });
}

  // You can add other methods later...
}
