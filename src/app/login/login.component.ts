import { BasicAuthenticationService, AUTHENTICATED_USER } from './../service/basic-authentication.service';
import { HardcodedAuthenticationService } from './../service/hardcoded-authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = sessionStorage.getItem(AUTHENTICATED_USER)
  password = ''
  errorMessage = 'Invalid Credentials'
  invalidLogin = false

  //Router
  //Angular.giveMeRouter
  //Dependency Injection
  constructor(private router: Router,
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService) { }

  ngOnInit() {
  }

  
  handleBasicAuthLogin() {
    this.basicAuthenticationService.executeAuthenticationService(this.username, this.password)
        .subscribe(
          data => {
            console.log(data)
            this.router.navigate(['employee', this.username])
            this.invalidLogin = false      
          },
          error => {
            console.log(error)
            this.invalidLogin = true
          }
        )
  }
//eyJhbGciOiJIUzUxMiJ9.
//eyJzdWIiOiJqYXN2aW5kZXIiLCJleHAiOjE1NzAxNzU1NDAsImlhdCI6MTU2OTU3MDc0MH0
//.CSc7m7TQq17EGvu8nUG1RayR61-AM4QlAqSMGchsFN6vz3zgcJTHF0aqwqMSDtMbCbj3FIAs3re1wk3er17yWg
  handleJWTAuthLogin() {
   // alert(this.username)
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
        .subscribe(
          data => {
            console.log(data)
            this.router.navigate(['employee'])
            this.invalidLogin = false      
          },
          error => {
            console.log(error)
            this.invalidLogin = true
          }
        )
  }

}
