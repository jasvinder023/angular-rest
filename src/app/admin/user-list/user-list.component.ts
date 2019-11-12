import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EMPLOYEE_JPA_API_URL } from 'src/app/app.constants';
import { EmployeeDataService } from 'src/app/service/employee/employee-data.service';
import { AUTHENTICATED_USER } from 'src/app/service/auth/authentication.service';
import { UserService } from 'src/app/service/user/user.service';
import { UserInfo } from 'src/app/entity/user-info';
import { Router } from '@angular/router';

//declare var $ ;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

 constructor(
   private userService: UserService,
   private router : Router) { }

 userInfoList: UserInfo[];
 message:string;

  ngOnInit() {
    this.fetchAllUsers();
  }


  fetchAllUsers(){
       this.userService.fetchAllUsers()
       .subscribe(response => {      
           this.userInfoList = response;
          // console.log(response);
         }
       )
     }
    
   editUser(userId: number){
    this.router.navigate(['user-edit',userId])
   }  

   deleteUser(userId: number){
    this.userService.deleteEmployee(userId).subscribe(
      response =>{
        this.message = `Delete of User ${userId} Successful!`;
        this.fetchAllUsers();
      }
    )
  }
  onCreateUser(){
    this.router.navigate(['user-edit',-1])

  }
}
