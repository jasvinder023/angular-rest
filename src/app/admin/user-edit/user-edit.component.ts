import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';
import { AUTHENTICATED_USER } from 'src/app/service/auth/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from 'src/app/entity/user-info';
import { NgForm } from '@angular/forms';
import { Role } from 'src/app/entity/role';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @ViewChild('userInfoForm', { static: false }) userInfoForm: NgForm;


  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router ) { }

    userId:number;
    loginUser:string
    userInfoData: UserInfo;
    roleList:Role[];
    saveMode=true;
  ngOnInit() {
    this.loginUser=sessionStorage.getItem(AUTHENTICATED_USER)
    this.userId = this.activatedRoute.snapshot.params['userId'];

   console.log("User id " +this.userId)

   ///create fetch roles service
   
   this.userService.fetchAllRoles().subscribe(response=>{
    this.roleList=response;
   });
  //  [
  //   new Role(32,'EMPLOYEE'),
  //   new Role(34,'ADMIN'),
  //   new Role(2,'MANAGER'),]
  //console.log(this.roleList)
   this.userInfoData=new UserInfo();
    
    
    if(this.userId!=-1) {
      this.saveMode=false;
      this.userService.fetchUserById(this.userId)
          .subscribe (
            response =>{
              this.userInfoData = response;
             // this.roleList=this.userInfoData.roles;
              console.log("user response==> "+this.userInfoData.firstName)
            } 
          )
         

    }
  }
  saveAndUpdateUser() {
    this.userInfoData=this.userInfoForm.value;
     if(this.userId == -1) { 
     
       this.userService.createNewUser(this.userInfoData)
           .subscribe (
             data => {
               console.log(data)
               this.router.navigate(['user-list'])
               
             }
           )
     } else {
      
      console.log(this.userInfoData);
       
       this.userService.updateUser(this.userId, this.userInfoData)
           .subscribe (data => {
               console.log(data)
                                    
             // this.employee = data.constructor
              this.router.navigate(['user-list'])
            
 
             }
           )
     }
   }

}
