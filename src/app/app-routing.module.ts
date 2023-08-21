import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { leadingComment } from '@angular/compiler';
import { LeaveComponent } from './leave/leave.component';
import { AuthGuard } from './auth/auth.guard';
import { PendingComponent } from './leave/pending/pending.component';
import { ApprovedComponent } from './leave/approved/approved.component';
import { RejectedComponent } from './leave/rejected/rejected.component';
import { UserComponent } from './user/user.component';
import { LeaveRequestComponent } from './leave/leave-request/leave-request.component';
import { EmployeeListComponent } from './_admin/employee-list/employee-list.component';
import { ActiveListComponent } from './_admin/employee-list/active-list/active-list.component';
import { DeleteListComponent } from './_admin/employee-list/delete-list/delete-list.component';


const routes: Routes = [
  // { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'leave', component: LeaveComponent },
  { path: 'pending', component: PendingComponent },
  { path: 'approved', component: ApprovedComponent },
  { path: 'rejected', component: RejectedComponent },
  { path: 'user', component: UserComponent },
  { path: 'request', component: LeaveRequestComponent },
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'active-list', component: ActiveListComponent },

  { path: 'delete-list', component: DeleteListComponent }






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



// canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] }