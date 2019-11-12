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
import { FooterComponent } from './shared/footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { Router } from '@angular/router';
import { AuthorizationGuard } from './service/auth/authorization.guard';
import { RoleComponent } from './register/role/role.component';
import { RbacAllowDirective } from './shared/directive/rbac-allow.directive';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { AdminComponent } from './admin/admin.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import * as $ from "jquery";
import { UserEditComponent } from './admin/user-edit/user-edit.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';


export function createAdminOnlyGuard(router:Router) {
  return new AuthorizationGuard(['ADMIN','MANAGER'],  router);
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    MenuComponent,
    FooterComponent,
    RegisterComponent,
    //EmployeeComponent,
    //ListEmployeeComponent,
    WelcomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
    
  ],
  providers: [
     {provide: HTTP_INTERCEPTORS,
      useClass: HttpIntercepterBasicAuthService, multi: true,

     }
       

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
