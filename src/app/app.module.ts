import { HttpIntercepterBasicAuthService } from './service/http/http-intercepter-basic-auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { EmployeeComponent } from './employee/employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RbacAllowDirective } from './directive/rbac-allow.directive';
import { Router } from '@angular/router';
import { AuthorizationGuard } from './service/authorization.guard';


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
    LogoutComponent,
    RegisterComponent,
    EmployeeComponent,
    ListEmployeeComponent,
    WelcomeComponent,
    RbacAllowDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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
