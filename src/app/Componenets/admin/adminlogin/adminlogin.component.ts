import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/core/services/Admin-Authentication/admin-authentication.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {
  loginForm: FormGroup;

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
    if (this.loginForm.invalid) return;

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (res) => {
        // ✅ حفظ التوكن في localStorage لتفعيل Interceptor تلقائيًا
        localStorage.setItem('token', res.token);

        // ✅ التنقل للوحة تحكم المشرف
        this.router.navigate(['/admin-account']);
      },
      error: (err) => {
        console.error('❌ Admin login error:', err);
      }
    });
  }
}
