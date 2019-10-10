import { Component, OnInit, Input } from '@angular/core';
import { AUTHENTICATED_USER, AuthenticationService } from '../service/auth/authentication.service';
import { EmployeeDataService } from '../service/employee/employee-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  loggedInUserName=''

//@Input("toChild") public loggedInUserName;
  constructor(
    private empDataService:EmployeeDataService,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
   this.empDataService.receivedFilter.subscribe((param:string) =>{
   this.loggedInUserName=param;
});
  }

  onLogOut(){
    this.authService.logout();
    this.router.navigate(['login'])
  }


}
