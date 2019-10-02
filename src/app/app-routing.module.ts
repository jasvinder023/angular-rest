
import { RouteGuardService } from './service/route-guard.service';
import { LogoutComponent } from './logout/logout.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { RegisterComponent } from './register/register.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { EmployeeComponent } from './employee/employee.component';
import { WelcomeComponent } from './welcome/welcome.component';


 
const routes: Routes = [
  { path: '', component: LoginComponent  },//canActivate, RouteGuardService
  { path: 'login', component: LoginComponent },

  { path: 'employee', component: ListEmployeeComponent, canActivate:[RouteGuardService] },
  { path: 'welcome', component: WelcomeComponent, canActivate:[RouteGuardService] },

  { path: 'logout', component: LogoutComponent, canActivate:[RouteGuardService] },
  { path: 'employee/:empId', component: EmployeeComponent, canActivate:[RouteGuardService] },
{ 
  path: 'register',
  component: RegisterComponent,
  
},


  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
