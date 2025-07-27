import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Student,
  StudentService,
} from 'src/app/core/services/student/student.service';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css'],
})
export class AdminStudentsComponent implements OnInit {
  studentForm!: FormGroup;
  students: Student[] = [];
  isEditMode = false;
  selectedStudentId: number | null = null;
  isLoading = false;
  selectedFile: File | null = null;

  displayedColumns = ['fullName', 'whatsAppNumber', 'email', 'actions'];

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadStudents();
  }

  initializeForm(): void {
    this.studentForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      nationalID: new FormControl('', [
        Validators.required,
        Validators.minLength(14),
      ]),
      whatsAppNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      profilePicture: new FormControl(''),
      password: new FormControl('', Validators.required),
    });
  }

  loadStudents(): void {
    this.isLoading = true;
    this.studentService.getAllStudents().subscribe({
      next: (res: Student[]) => {
        this.students = res;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('❌ Failed to load students:', err);
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid || !this.selectedFile) return;

    const formData = new FormData();
    formData.append('fullName', this.studentForm.value.fullName);
    formData.append('nationalID', this.studentForm.value.nationalID);
    formData.append('whatsAppNumber', this.studentForm.value.whatsAppNumber);
    formData.append('email', this.studentForm.value.email);
    formData.append('password', this.studentForm.value.password);
    formData.append('profilePicture', this.selectedFile); // لازم تكون موجودة فعلاً


    this.studentService.createStudent(formData).subscribe({
      next: (res) => {
        this.loadStudents();
        this.resetForm();
        console.log('Selected file:', this.selectedFile);
        console.log('Student register response:', res);

      },
      error: (err) => console.error('❌ Operation failed:', err),
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
  }
  editStudent(student: Student): void {
    this.studentForm.patchValue({
      fullName: student.fullName,
      nationalID: student.nationalID,
      whatsAppNumber: student.whatsAppNumber,
      email: student.email,
      profilePicture: student.profilePicture,
      password: '',
    });

    this.isEditMode = true;
    this.selectedStudentId = student.studentId ?? null;
  }

  deleteStudent(id: number | undefined): void {
    if (!id) return;

    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        this.loadStudents();
        this.resetForm();
      },
      error: (err: any) => {
        console.error('❌ Failed to delete student:', err);
      },
    });
  }

  openStudentProfile(id: number): void {
    this.router.navigate(['/student-account', id]);
  }

  resetForm(): void {
    this.studentForm.reset();
    this.isEditMode = false;
    this.selectedStudentId = null;
  }
}
