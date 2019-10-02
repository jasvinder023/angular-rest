import { HardcodedAuthenticationService } from './../service/hardcoded-authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { AUTHENTICATED_USER } from '../service/basic-authentication.service';
import { EmployeeDataService } from '../employee-data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  loggedInUserName=''

//@Input("toChild") public loggedInUserName;
  constructor(private hardcodedAuthenticationService 
    : HardcodedAuthenticationService,private empDataService:EmployeeDataService) { }

  ngOnInit() {
this.empDataService.receivedFilter.subscribe((param:string) =>{
this.loggedInUserName=param;
});
  }


}
