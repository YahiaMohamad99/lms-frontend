import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService, Student } from 'src/app/core/services/student/student.service';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements OnInit {
  studentForm!: FormGroup;
  students: Student[] = [];
  isEditMode = false;
  selectedStudentId: number | null = null;
  isLoading = false;
  displayedColumns = ['fullName', 'nationalID', 'whatsAppNumber', 'email', 'actions'];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadStudents();
  }

  initializeForm(): void {
    this.studentForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      nationalID: new FormControl('', [Validators.required, Validators.minLength(14)]),
      whatsAppNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      profilePicture: new FormControl(''),
      password: new FormControl('', Validators.required)
    });
  }

  loadStudents(): void {
    this.isLoading = true;
    this.studentService.getAllStudents().subscribe({
      next: (res) => {
        this.students = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Failed to load students:', err);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {

    if (this.studentForm.invalid) return;

    const studentData = this.studentForm.value;
    console.log('🧾 Student data before sending:', studentData);

    const request$ = this.isEditMode && this.selectedStudentId !== null
      ? this.studentService.updateStudent(this.selectedStudentId, studentData)
      : this.studentService.createStudent(studentData);

    request$.subscribe({
      next: () => {
        this.loadStudents();
        this.resetForm();
      },
      error: (err) => {
        console.error('❌ Operation failed:', err);
      }
    });

  }

editStudent(student: Student): void {
  console.log('✏️ Preparing to edit student:', student);

  this.studentForm.patchValue({
    fullName: student.fullName,
    nationalID: student.nationalID,
    whatsAppNumber: student.whatsAppNumber,
    email: student.email,
    profilePicture: student.profilePicture,
    password: '' // تقدر تخليه مطلوب إعادة إدخال
  });

  this.isEditMode = true;
  this.selectedStudentId = student.studentId ?? null;

  console.log('📌 Selected student ID:', this.selectedStudentId);
}


deleteStudent(id: number | undefined): void {
  if (!id) {
    console.warn('❌ لا يوجد ID للحذف');
    return;
  }

  console.log('🗑️ ID to delete:', id); // ✅ تحقق من وجود ID

  this.studentService.deleteStudent(id).subscribe({
    next: () => {
      console.log('✅ تم حذف الطالب');
      this.loadStudents();
      this.resetForm();
    },
    error: (err) => {
      console.error('❌ خطأ في الحذف:', err);
    }
  });
}


  resetForm(): void {
    this.studentForm.reset();
    this.isEditMode = false;
    this.selectedStudentId = null;
  }
  logStudent(student: Student): void {
  console.log('📦 Student object:', student);
}

}
