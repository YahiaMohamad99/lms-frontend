import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AttendanceService, StudentAttendance } from 'src/app/core/services/student-attendance/student-attendeance.service';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css']
})
export class StudentAttendanceComponent implements OnInit {
  attendanceRecords: StudentAttendance[] = [];
  studentName = '';

  constructor(private route: ActivatedRoute, private attendanceService:AttendanceService ) {}

  ngOnInit(): void {
    const studentId = Number(this.route.snapshot.paramMap.get('id'));

    this.attendanceService.getByStudent(studentId).subscribe({
      next: (records) => {
        console.log(records);
        
        this.attendanceRecords = records;
        this.studentName = records[0]?.studentName || 'Student';
      },
      error: (err:any) => {
        console.error('❌ Failed to fetch attendance:', err);
      }
    });
  }


}
