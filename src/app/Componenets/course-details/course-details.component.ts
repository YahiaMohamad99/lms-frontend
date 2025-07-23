import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/core/services/session/session.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html'
})
export class CourseDetailsComponent implements OnInit {
  sessions: any[] = [];
  courseId!: number;
  sessionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // استخراج رقم الكورس من الـ route
    this.courseId = +this.route.snapshot.paramMap.get('courseId')!;
    
    // إنشاء فورم الجلسة
    this.sessionForm = this.fb.group({
      title: ['', Validators.required],
    
      startTime: [new Date(), Validators.required]
    });

    this.loadSessions();
  }

  loadSessions(): void {
    this.sessionService.getSessionsByCourse(this.courseId).subscribe({
      next: res => this.sessions = res,
      error: err => console.error('❌ فشل تحميل الجلسات:', err)
    });
  }

  addSession(): void {
    const sessionData = {
      title: this.sessionForm.value.title,
     
       startTime: new Date().toISOString(),
      qrCode: 'QR-' + Math.floor(Math.random() * 100000),
      courseId: this.courseId
      // 👈 adminId هيتحدد تلقائيًا من الـ backend
    };

    this.sessionService.addSession(sessionData).subscribe({
      next: () => {
        this.sessionForm.reset();
        this.sessionForm.patchValue({ subject: 'عام', startTime: new Date() });
        this.loadSessions();
      },
    error: (err) => {
  console.error('❌ حالة الخطأ:', err.status);

  if (err.status === 401) {
    alert('⚠️ لم يتم التحقق من الهوية. تأكد من تسجيل الدخول أو التوكن.');
  } else if (err.error?.errors) {
    console.error('❌ تفاصيل الخطأ:', err.error.errors);
  } else {
    console.error('❌ استجابة الخطأ الكاملة:', err);
  }
}

    });
  }

  deleteSession(sessionId: number): void {
    this.sessionService.deleteSession(sessionId).subscribe({
      next: () => this.loadSessions(),
      error: err => console.error('❌ فشل حذف الجلسة:', err)
    });
  }

  goToSession(sessionId: number): void {
    this.router.navigate(['/session', sessionId]);
  }
}
