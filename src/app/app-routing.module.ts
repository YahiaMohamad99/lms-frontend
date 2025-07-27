import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAccountComponent } from './Componenets/admin/admin-account/admin-account.component';
import { StudentAccountComponent } from './Componenets/student/student-account/student-account.component';
import { NotfoundComponent } from './Componenets/notfound/notfound.component';
import { StudentloginComponent } from './Componenets/student/studentlogin/studentlogin.component';
import { AdminloginComponent } from './Componenets/admin/adminlogin/adminlogin.component';
import { AdminStudentsComponent } from './Componenets/admin/admin-students/admin-students.component';
import { AdminCoursesComponent } from './Componenets/admin/admin-courses/admin-courses.component';
import { AdminSessionsComponent } from './Componenets/admin/admin-sessions/admin-sessions.component';
import { AdminAttendanceComponent } from './Componenets/admin/admin-attendance/admin-attendance.component';
import { AdminMaterialsComponent } from './Componenets/admin/admin-materials/admin-materials.component';
import { CourseDetailsComponent } from './Componenets/course-details/course-details.component';
import { SessionDetailsComponent } from './Componenets/session-details/session-details.component';
import { StudentAttendanceComponent } from './Componenets/student-attendance/student-attendance.component';

const routes: Routes = [
  { path: '', redirectTo: 'adminshrouk', pathMatch: 'full' },
  { path: 'adminshrouk', component: AdminloginComponent },
  { path: 'admin-login', component: AdminloginComponent },
  { path: 'student-login', component: StudentloginComponent },
  { path: 'student-account/:id', component: StudentAccountComponent },
  { path: 'student-account', component: StudentAccountComponent },
  { path: 'admin-account', component: AdminAccountComponent },
  { path: 'admin-students', component: AdminStudentsComponent },
  { path: 'student-attendance/:id',component: StudentAttendanceComponent},
  { path: 'admin-courses', component: AdminCoursesComponent },
  { path: 'admin-sessions', component: AdminSessionsComponent },
  { path: 'admin-attendance', component: AdminAttendanceComponent },
  { path: 'admin-materials', component: AdminMaterialsComponent },
    { path: 'course/:courseId', component: CourseDetailsComponent },
  { path: 'session/:sessionId', component: SessionDetailsComponent },






  { path: '**', component: NotfoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
