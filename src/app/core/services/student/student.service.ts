import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
   studentId: number; 
  fullName: string;
  nationalID: string;
  whatsAppNumber: string;
  email: string;
  profilePicture: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private registerUrl = 'https://localhost:7035/api/Auth/register';
  private studentUrl = 'https://localhost:7035/api/Student';



  constructor(private http: HttpClient) {}

  // ✅ إنشاء حساب طالب جديد
createStudent(studentData: FormData): Observable<any> {
  return this.http.post(this.registerUrl, studentData);
}

updateStudent(studentId: number, studentData: FormData): Observable<any> {
  return this.http.put(`/api/students/${studentId}`, studentData);
}


  // ✅ حذف طالب
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.studentUrl}/${id}`);
  }

  // ✅ عرض ملف طالب محدد
  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.studentUrl}/${id}`);
  }

  // ✅ عرض جميع الطلبة
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentUrl);
  }


  

}
