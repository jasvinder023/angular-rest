import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AUTHENTICATED_USER, AuthenticationService } from '../service/auth/authentication.service';
import { EmployeeDataService } from '../service/employee/employee-data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  loggedInUserName=''

  loggedInUserSubscription: Subscription

//@Input("toChild") public loggedInUserName;
  constructor(
    private empDataService:EmployeeDataService,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
   this.loggedInUserSubscription=this.authService.receivedFilter.subscribe((param:string) =>{
   this.loggedInUserName=param;
   console.log("log user name------"+param)
});
  }

  ngOnDestroy(){
    this.loggedInUserSubscription.unsubscribe();
  }

  onLogOut(){
    this.authService.logout();
    this.router.navigate(['login'])
  }


}
