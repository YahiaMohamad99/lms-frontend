import { Component } from '@angular/core';
import { Student, StudentService } from 'src/app/core/services/student/student.service';
import { StudentRegisterCourseService } from 'src/app/core/services/student_register_course/student-register-course.service';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin,Observable } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-student-enrollment-dialog',
  templateUrl: './student-enrollment-dialog.component.html',
  styleUrls: ['./student-enrollment-dialog.component.css']
})
export class StudentEnrollmentDialogComponent {

  students: Student[] = [];
  selectedStudents: Student[] = [];

  courseId: number;
  courseTitle: string;

  constructor(
   private  allstudent:StudentService,
    private studentService: StudentRegisterCourseService,
    private dialogRef: MatDialogRef<StudentEnrollmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.courseId = data.courseId;
    this.courseTitle = data.courseTitle;
  }

  ngOnInit(): void {
    // مؤقتًا: بيانات تجريبية
   this.allstudent.getAllStudents().subscribe(data => {
    this.students = data;
  });
  }

  selectAllStudents(): void {
    this.selectedStudents = [...this.students];
  }

  clearSelections(): void {
    this.selectedStudents = [];
  }


registerSelectedStudents(): void {
  if (!this.selectedStudents || this.selectedStudents.length === 0) {
    console.warn('⚠️ لم يتم اختيار أي طلاب للتسجيل.');
    return;
  }

  this.selectedStudents.forEach((selected, index) => {
    // نحاول نستخرج الطالب سواء جاي في data.student أو في data أو هو نفسه
    const student: Student = selected;

    let studentId: number;
    let studentName = '';

    // نتأكد إن اللي معانا كائن طالب حقيقي
    if (typeof student === 'number') {
      studentId = student;
    } else if (student && typeof student === 'object') {
      studentId = student.studentId ?? student.studentId;
      studentName = student.fullName || '';
    } else {
      console.warn('⚠️ الطالب غير معروف الشكل:', student);
      return;
    }

    // لو مفيش studentId نوقف العملية
    if (!studentId) {
      console.warn(`⚠️ الطالب ${studentName || 'بدون اسم'} لا يملك studentId`);
      return;
    }

    // نبدأ بالتحقق هل الطالب بالفعل مسجل في الكورس
    this.studentService.checkStudentEnrollment(studentId, this.courseId).subscribe({
      next: (isEnrolled: boolean) => {
        if (isEnrolled) {
          console.log(`ℹ️ الطالب ${studentName} مسجل بالفعل في الكورس.`);
        } else {
          // لو مش مسجل نضيفه
          this.studentService.addStudentToCourse(studentId, this.courseId).subscribe({
            next: () => {
              console.log(`✅ تم تسجيل الطالب ${studentName} بنجاح.`);
              // نغلق الـ dialog لما يخلص آخر طالب
              if (index === this.selectedStudents.length - 1) {
                this.dialogRef.close(true);
              }
            },
            error: (err) => {
              console.error(`❌ خطأ أثناء تسجيل الطالب ${studentName}:`, err);
            }
          });
        }
      },
      error: (err) => {
        console.error(`❌ فشل التحقق من تسجيل الطالب ${studentName}:`, err);
      }
    });
  });
}









}
