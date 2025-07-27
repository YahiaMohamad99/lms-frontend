import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { Course, Session, CourseService } from 'src/app/core/services/course/course.service';
import { DialogConfirmComponent } from 'src/app/shared/dialog-confirm/dialog-confirm.component'; // تأكيد الحذف
import { StudentEnrollmentDialogComponent } from '../../student-enrollment-dialog/student-enrollment-dialog.component';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent {
  expandedStudentsCourseId: number | null = null;

  courses: Course[] = [];
  expandedCourseId: number | null = null;

  courseForm!: FormGroup;
  editMode: boolean = false;
  editCourseId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private dialog: MatDialog,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', Validators.required]
    });

    this.loadCourses();
  }
  // ✳️ إنشاء كورس جديد
  onSubmit(): void {
    const courseData = {
      title: this.courseForm.value.title
    };

    this.courseService.createCourse(courseData).subscribe({
      next: () => {
        this.courseForm.reset();
        this.loadCourses();
      },
      error: (err) => console.error('❌ فشل إضافة الكورس:', err)
    });
  }
  // 📥 تحميل الكورسات من السيرفر
  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (res) => this.courses = res,
      error: (err) => console.error('❌ فشل تحميل الكورسات:', err)
    });
  }
  // ⚠️ تأكيد الحذف قبل تنفيذ العملية
  confirmAndDelete(courseId: number): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteCourse(courseId);
      }
    });
  }
  // 🗑️ حذف الكورس فعليًا
 deleteCourse(id: number): void {
  this.courseService.deleteCourse(id).subscribe({
    next: () => this.loadCourses(),
    error: (err) => {
      if (err.status === 400) {
        alert('❌ لا يمكن حذف كورس مرتبط بجلسات. احذف الجلسات أولاً.');
      } else {
        console.error('❌ فشل الحذف:', err);
      }
    }
  });
}
// 📂 عرض السيشنات المرتبطة بالكورس
goToCourseDetails(courseId: number): void {
  this.router.navigate(['/course', courseId]);
}
  // ✏️ تفعيل وضع التعديل
  editCourse(course: Course): void {
    this.editMode = true;
    this.editCourseId = course.courseId;
    this.courseForm.patchValue({ title: course.title });
  }
  // 💾 حفظ التعديل
  submitEdit(): void {
    if (!this.editCourseId) return;

    this.courseService.updateCourse(this.editCourseId, this.courseForm.value).subscribe({
      next: () => {
        this.editMode = false;
        this.editCourseId = null;
        this.courseForm.reset();
        this.loadCourses();
      },
      error: (err) => console.error('❌ فشل التعديل:', err)
    });
  }


toggleStudents(courseId: number) {
  this.expandedStudentsCourseId = this.expandedStudentsCourseId === courseId ? null : courseId;
}

openEnrollDialog(course: Course): void {
  this.dialog.open(StudentEnrollmentDialogComponent, {
    width: '600px',
    data: {
      courseId: course.courseId,
      title: course.title
    }
  });
}

}
