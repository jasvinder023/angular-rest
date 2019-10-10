import { HttpIntercepterBasicAuthService } from './service/http/http-intercepter-basic-auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './shared/error/error.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { EmployeeComponent } from './employee/employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { Router } from '@angular/router';
import { AuthorizationGuard } from './service/auth/authorization.guard';
import { RoleComponent } from './register/role/role.component';
import { RbacAllowDirective } from './shared/directive/rbac-allow.directive';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';


export function createAdminOnlyGuard(router:Router) {
  return new AuthorizationGuard(['ADMIN'],  router);
}



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    MenuComponent,
    FooterComponent,
    RegisterComponent,
    EmployeeComponent,
    ListEmployeeComponent,
    WelcomeComponent,
    RbacAllowDirective,
    RoleComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    EmployeeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
     {provide: HTTP_INTERCEPTORS,
      useClass: HttpIntercepterBasicAuthService, multi: true,

     },
     {
      provide: 'adminsOnlyGuard',
      useFactory: createAdminOnlyGuard,
      deps: [
          
          Router
      ]

  }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
