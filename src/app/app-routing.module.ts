
import { RouteGuardService } from './service/route-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './shared/error/error.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { AdminComponent } from './admin/admin.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { UserEditComponent } from './admin/user-edit/user-edit.component';
import { createAdminOnlyGuard } from './app.module';


 
const routes: Routes = [
  { path: '', component: LoginComponent  },//canActivate, RouteGuardService
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate:[RouteGuardService,"adminsOnlyGuard"] },
  { path: 'user-list', component: UserListComponent, canActivate:[RouteGuardService,"adminsOnlyGuard"] },
  { path: 'user-edit/:userId', component: UserEditComponent, canActivate:[RouteGuardService,"adminsOnlyGuard"] },


  { path: 'employee', component: EmployeeListComponent, canActivate:[RouteGuardService], children:[
     
     { path: ':empId', 
       component: EmployeeEditComponent, 
       canActivate:[RouteGuardService]
     },

  ] },
  
  { path: 'welcome', component: WelcomeComponent, canActivate:[RouteGuardService] },

  
{ 
  path: 'register',
  component: RegisterComponent,
  canActivate: ["adminsOnlyGuard"]
},

{
  path: 'error/:msg',
  component:ErrorComponent,
  canActivate:[RouteGuardService]
},
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
