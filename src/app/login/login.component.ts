
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../service/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f', { static: false }) loginForm: NgForm;
   username = ''
   password = ''
   //errorMessage = 'Invalid Credentials'
   errorMessage=''
   invalidLogin = false

  //Router
  //Angular.giveMeRouter
  //Dependency Injection
  constructor(private router: Router,
    private authService: AuthenticationService) { }

  ngOnInit() {
  }


  handleJWTAuthLogin() {
    console.log(this.loginForm)
   this.username=this.loginForm.value.username;
   this.password=this.loginForm.value.password;
   console.log("User name ==> " +this.username)
   console.log("Password ==> " +this.password)
    this.authService.executeJWTAuthenticationService(this.username, this.password)
        .subscribe(
          data => {
            console.log(data)
            console.log("-------------------------------")
            this.router.navigate(['employee'])
            this.invalidLogin = false      
          },
          error => {
            console.log(error.error)
              this.invalidLogin = true;
              this.errorMessage=error.error
          }
        )
  }



  
  // handleBasicAuthLogin() {

  //   this.basicAuthenticationService.executeAuthenticationService(this.username, this.password)
  //       .subscribe(
  //         data => {
  //           console.log(data)
  //           this.router.navigate(['employee', this.username])
  //           this.invalidLogin = false      
  //         },
  //         error => {
  //           console.log(error)
  //           this.invalidLogin = true
  //         }
  //       )
  // }
  
}
