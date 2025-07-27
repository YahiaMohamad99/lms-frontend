import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SessionContent {
  sessionContentId: number;
  sessionId: number;
  type: string;           // 'Video' | 'Document' | 'Code'
  resourceUrl: string;
  originalName: string;  // 👈 لازم تضيف السطر ده
}


@Injectable({
  providedIn: 'root'
})
export class SessionContentService {
  private apiUrl = 'https://localhost:7035/api/session-contents';

  constructor(private http: HttpClient) {}

  // 📥 جلب كل الملفات المرتبطة بجلسة معينة
getBySession(sessionId: number): Observable<{ message: string; data: SessionContent[] }> {
  return this.http.get<{ message: string; data: SessionContent[] }>(
    `${this.apiUrl}/session/${sessionId}`
  );
}


  // ➕ إضافة محتوى جديد
  addContent(content: Partial<SessionContent>): Observable<SessionContent> {
    return this.http.post<SessionContent>(this.apiUrl, content);
  }

  // ✏️ تعديل رابط أو نوع
  updateContent(contentId: number, updated: Partial<SessionContent>): Observable<SessionContent> {
    return this.http.put<SessionContent>(`${this.apiUrl}/${contentId}`, updated);
  }

  // 🗑️ حذف ملف معين
  deleteContent(contentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${contentId}`);
  }
  uploadContent(sessionId: number, type: string, file: File): Observable<SessionContent> {
  const formData = new FormData();
  formData.append('sessionId', sessionId.toString());
  formData.append('type', type);
  formData.append('file', file);
    
  return this.http.post<SessionContent>(`${this.apiUrl}/upload`, formData);
}

}
