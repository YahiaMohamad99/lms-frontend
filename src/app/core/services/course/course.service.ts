import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Session {
  sessionId: number;
  topic: string;
  date: string;
}

export interface Course {
  courseId: number;
  title: string;
  sessions: Session[]; // ✳️ مهم لعرض السيشنات
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'https://localhost:7035/api/Course';

  constructor(private http: HttpClient) {}

  // ✳️ إضافة كورس جديد
  createCourse(course: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  // 📥 تحميل كل الكورسات
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  // 🗑️ حذف كورس
  deleteCourse(courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${courseId}`);
  }

  // ✏️ تعديل كورس
  updateCourse(courseId: number, updatedData: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${courseId}`, updatedData);
  }

  // 📂 جلب كورس بالسيشنات المرتبطة بيه
  getCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${courseId}`);
  }
}
