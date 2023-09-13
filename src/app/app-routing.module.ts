import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LeaveComponent } from './leave/leave.component';
import { AuthGuard } from './auth/auth.guard';
import { UserComponent } from './user/user.component';
import { LeaveRequestComponent } from './leave/leave-request/leave-request.component';
import { EmployeeListComponent } from './_admin/employee-list/employee-list.component';
import { LeaveManagerComponent } from './_admin/leave-manager/leave-manager.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'leave', component: LeaveComponent },
  { path: 'user', component: UserComponent },
  { path: 'request', component: LeaveRequestComponent },
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'leave-manager', component: LeaveManagerComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



