import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentRegisterCourseService {

  constructor(private http: HttpClient) { }

  
checkStudentEnrollment(studentId: number, courseId: number): Observable<boolean> {
  return this.http.get<boolean>(`https://localhost:7035/api/student/check-enrollment?studentId=${studentId}&courseId=${courseId}`);
}


  addStudentToCourse(studentId: number, courseId: number): Observable<any> {
    const url = `https://localhost:7035/api/student/register-course`;
  console.log('📡 Calling:', url);
  console.log('🧾 Payload:', { studentId, courseId });
  return this.http.post(url, { studentId, courseId });
  }

  removeStudentFromCourse(studentId: number, courseId: number): Observable<any> {
    return this.http.post(`https://localhost:7035/api/student/unregister-course`, { studentId, courseId });
  }

}
