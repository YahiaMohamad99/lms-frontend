import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private apiUrl = 'https://localhost:7035/api/Auth/login-admin';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials).pipe(
      tap((res) => {
        // ✅ حفظ التوكن
        localStorage.setItem('token', res.token);

        try {
          const payload = JSON.parse(atob(res.token.split('.')[1]));
          const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          const adminId = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

          localStorage.setItem('role', role);
          localStorage.setItem('adminId', adminId);
        } catch (err) {
          console.error('❌ Failed to parse JWT token:', err);
          localStorage.clear();
        }
      }),
      catchError((error) => {
        console.error('❌ Login API error:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('adminId');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getAdminId(): string | null {
    return localStorage.getItem('adminId');
  }

  isAdminLoggedIn(): boolean {
    return this.getRole() === 'Admin' && !!this.getToken();
  }
}
