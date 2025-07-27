import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student, StudentService } from 'src/app/core/services/student/student.service';

@Component({
  selector: 'app-student-account',
  templateUrl: './student-account.component.html',
  styleUrls: ['./student-account.component.css']
})
export class StudentAccountComponent implements OnInit {
  studentId!: number;

  student:any;
  defaultImage = 'assets/default-avatar.png'; // صورة افتراضية لو الطالب مش حاطط صورة
  imageBaseUrl: string = 'https://localhost:7035';


  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.studentId = Number(this.route.snapshot.paramMap.get('id'));

    this.studentService.getStudentById(this.studentId).subscribe({
      next: (res) => 
        {this.student = res,
          console.log('Student API response:', this.student);

              console.log('Student API response:', res);  
          console.log('Student picture path:', this.student.profilePicture)
      },
      error: (err: any) => console.error('❌ Failed to fetch student:', err)
    });
  }

  navigateToAttendance(): void {
    this.router.navigate(['/student-attendance', this.studentId]);
  }

  navigateToSubmissions(): void {
    this.router.navigate(['/student-submissions', this.studentId]);
  }
}
