import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/Authintication/AuthinticationService';

@Component({
  selector: 'app-studentlogin',
  templateUrl: './studentlogin.component.html',
  styleUrls: ['./studentlogin.component.css']
})
export class StudentloginComponent 
{
   loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService:AuthenticationService,
    private router: Router
  ) 
  {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void 
  {
    if (this.loginForm.valid)
     {
      const credentials = {
        email: this.loginForm.get('email')?.value || '',
        password: this.loginForm.get('password')?.value || ''
      };



 this.authService.login(credentials).subscribe({
  next: (res) => {
    const token = res.token;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];


    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    // ✅ التحويل حسب الدور
    if (role === 'Admin') {
      console.log("Hello admin");
      
      this.router.navigate(['/components/admin/admin-account']);
    } else if (role === 'Student') {
      console.log("Hello student");

      this.router.navigate(['/student-account']);
    } else {
      this.router.navigate(['/components/notfound']);
      console.log(" noooo");
    

      
    }
  },
  error: (err) => {
    console.error('Login error:', err);
  }
});



    }
  }
}




