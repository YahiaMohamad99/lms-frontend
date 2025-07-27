import { Component } from '@angular/core';
import { AttendanceView } from 'src/app/core/interfaces/attendance-view';
import { SessionAttendance } from 'src/app/core/interfaces/session-attendance';
import { AttendanceService } from 'src/app/core/services/student-attendance/student-attendeance.service';
import { AttendanceStatusDialogComponent } from '../../attendance-status-dialog/attendance-status-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-attendance',
  templateUrl: './admin-attendance.component.html',
  styleUrls: ['./admin-attendance.component.css']
})
export class AdminAttendanceComponent {

  
  courseId = 2020; // ممكن تجيبها من مكان مناسب
  attendanceData: AttendanceView[] = [];
  sessions: SessionAttendance[] = [];

  constructor(private attendanceService: AttendanceService ,  private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadAttendance();
  }

  loadAttendance() {
    this.attendanceService.getAttendanceByCourse(this.courseId).subscribe(data => {
      this.attendanceData = data;

      // عشان نعرض الأعمدة للجلسات، بناخد السيشنز من أول طالب (مفترض الجلسات ثابتة لكل الطلبة)
      if (data.length > 0) {
        this.sessions = data[0].attendance.map(a => ({
          sessionId: a.sessionId,
          sessionTitle: a.sessionTitle,
          isPresent: false // مش محتاجينها للعرض في الهيدر
        }));
      }
    });
  }


  onCellClick(student: AttendanceView, attendance: SessionAttendance) {
    const dialogRef = this.dialog.open(AttendanceStatusDialogComponent, {
      width: '300px',
      data: {
        studentName: student.studentName,
        sessionTitle: attendance.sessionTitle,
        currentStatus: attendance.isPresent
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null && result !== attendance.isPresent) {
        // حدث الحالة محليًا عشان تتحدث الواجهة فوراً
        attendance.isPresent = result;

        // هنا ممكن تضيف استدعاء API لتحديث البيانات في الباك إند
        this.attendanceService.updateAttendanceStatus(student.studentId, attendance.sessionId, result).subscribe({
          next: () => {
            console.log('تم تحديث الحضور بنجاح');
          },
          error: (err) => {
            console.error('خطأ في تحديث الحضور', err);
            // ممكن ترجع الحالة القديمة لو حصل خطأ
            attendance.isPresent = !result;
          }
        });
      }
    });
  }
}
