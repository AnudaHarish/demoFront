import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http'
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { LeaveComponent } from './leave/leave.component';
import { UserService } from './_service/user/user.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { EmpolyeeService } from './_service/empolyee.service';
import { PendingComponent } from './leave/pending/pending.component';
import { ApprovedComponent } from './leave/approved/approved.component';
import { RejectedComponent } from './leave/rejected/rejected.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserComponent } from './user/user.component';
import { LeaveRequestComponent } from './leave/leave-request/leave-request.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserLeaveComponent } from './user/user-leave/user-leave.component';
import { EmployeeListComponent } from './_admin/employee-list/employee-list.component';
import { ActiveListComponent } from './_admin/employee-list/active-list/active-list.component';
import { DeleteListComponent } from './_admin/employee-list/delete-list/delete-list.component';
import { AcceptLeaveComponent } from './_admin/accept-leave/accept-leave.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    HeaderComponent,
    LeaveComponent,
    PendingComponent,
    ApprovedComponent,
    RejectedComponent,
    UserComponent,
    LeaveRequestComponent,
    SignupComponent,
    UserProfileComponent,
    UserLeaveComponent,
    EmployeeListComponent,
    ActiveListComponent,
    DeleteListComponent,
    AcceptLeaveComponent










  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    FontAwesomeModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DatePipe,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule




  ],
  providers: [DatePipe,
    AuthGuard, // Use AuthGuard class here
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    UserService,
    EmpolyeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
