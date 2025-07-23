import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Session {
  sessionId: number;
  courseId: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = 'https://localhost:7035/api/sessions'; // غيّره حسب اسم الـ Controller لو مختلف

  constructor(private http: HttpClient) {}

  getSessionsByCourse(courseId: number): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.apiUrl}/course/${courseId}`);
  }

  addSession(session: Partial<Session>): Observable<Session> {  
    return this.http.post<Session>(`${this.apiUrl}`, session);
  }

  deleteSession(sessionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${sessionId}`);
  }
}
