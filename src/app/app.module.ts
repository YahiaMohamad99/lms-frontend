import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // لو محتاجه للـ form
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminAccountComponent } from './Componenets/admin/admin-account/admin-account.component';
import { StudentAccountComponent } from './Componenets/student/student-account/student-account.component';
import { NotfoundComponent } from './Componenets/notfound/notfound.component';
import { StudentloginComponent } from './Componenets/student/studentlogin/studentlogin.component';
import { AdminloginComponent } from './Componenets/admin/adminlogin/adminlogin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { AdminStudentsComponent } from './Componenets/admin/admin-students/admin-students.component';
import { AdminCoursesComponent } from './Componenets/admin/admin-courses/admin-courses.component';
import { AdminSessionsComponent } from './Componenets/admin/admin-sessions/admin-sessions.component';
import { AdminAttendanceComponent } from './Componenets/admin/admin-attendance/admin-attendance.component';
import { AdminSubmissionsComponent } from './Componenets/admin/admin-submissions/admin-submissions.component';
import { AdminMaterialsComponent } from './Componenets/admin/admin-materials/admin-materials.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { SessionContentComponent } from './Componenets/session-content/session-content.component';

import { CourseDetailsComponent } from './Componenets/course-details/course-details.component';
import { SessionDetailsComponent } from './Componenets/session-details/session-details.component';


@NgModule({
  declarations: [AppComponent, AdminAccountComponent, StudentAccountComponent, NotfoundComponent, StudentloginComponent, AdminloginComponent, AdminStudentsComponent, AdminCoursesComponent, AdminSessionsComponent, AdminAttendanceComponent, AdminSubmissionsComponent, AdminMaterialsComponent, SessionContentComponent, CourseDetailsComponent, SessionDetailsComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MaterialModule,
      FormsModule

  ],
  providers: [
    {
           provide: HTTP_INTERCEPTORS,
           useClass: AuthInterceptor,
            multi: true
    }
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
