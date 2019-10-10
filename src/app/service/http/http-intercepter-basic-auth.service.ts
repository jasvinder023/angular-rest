import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor{

  constructor(
    private authService : AuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler){
    
    let jwtTokenString = this.authService.getAuthenticatedToken();
    let username = this.authService.getAuthenticatedUser()

    if(jwtTokenString && username) { 
      request = request.clone({
        setHeaders : {
            Authorization : jwtTokenString
          }
        }) 
    }
    return next.handle(request);
  }


}
