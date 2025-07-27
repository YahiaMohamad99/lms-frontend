import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/core/services/Admin-Authentication/admin-authentication.service';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null; // متغير جديد لعرض رسالة الخطأ العامة

  constructor(
    private fb: FormBuilder,
    private authService: AdminAuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    this.errorMessage = null; // إعادة تعيين رسالة الخطأ عند كل محاولة تسجيل دخول

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Please fill in all required fields correctly.'; // رسالة عامة لحقول الإدخال
      return;
    }

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/admin-account']);
      },
      error: (err: HttpErrorResponse) => { // تحديد نوع الخطأ كـ HttpErrorResponse
        console.error('❌ Admin login error:', err);
        if (err.status === 401 || err.status === 403) {
          // خطأ في بيانات الاعتماد (Unauthorized)
          this.errorMessage = 'Invalid email or password. Please try again.';
        } else if (err.error && err.error.message) {
          // لو الـ Backend بيرجع رسالة خطأ معينة
          this.errorMessage = err.error.message;
        } else {
          // خطأ عام غير معروف
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }
}