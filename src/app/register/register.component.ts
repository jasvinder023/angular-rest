import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Role } from '../entity/role';
import { UserInfo } from '../entity/user-info';
import { AuthenticationService } from '../service/auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //genders = ['male', 'female'];
  
  forbiddenUsernames = ['Chris', 'Anna'];
  signupForm: FormGroup;
  allRoles: Role[];
  isUserActive;
  regFormInvalid=true;
  constructor(private formBuilder:FormBuilder,
              private authService: AuthenticationService,
              private router: Router) {}
  
  ngOnInit() {
   this.signupForm=this.formBuilder.group({
        username: [null, [Validators.required]],
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password:[null,Validators.required],
        roles: [null,[Validators.required]],
        isActive: new FormControl('YES'),
      })
      // initilase roles using service
      // For testing hard coding roles
      this.allRoles=[
        new Role(34,'ADMIN'),
        new Role(2,'MANAGER'),]

        this.isUserActive = ['YES', 'NO'];
      
    }
  
  
  onSubmit() {
    console.log(this.signupForm);
   // console.log(this.signupForm.value.email)

   if(this.signupForm.valid){
   this.regFormInvalid=false;
   
   }else return;

   let newUserInfo: UserInfo =this.signupForm.value;

   console.log("MY I+USER  "+newUserInfo.email)

   this.authService.executeRegister(newUserInfo)
   .subscribe (
     data => {
       console.log(data)
       this.router.navigate(['employee'])
     });

   
  }

  // onAddHobby() {
  //   const control = new FormControl(null, Validators.required);
  //   (<FormArray>this.signupForm.get('hobbies')).push(control);
  // }


  setRegisterDefault(){
 let userTemp =new UserInfo();
 userTemp.username="default user";
 userTemp.firstName="default firstname";
 userTemp.lastName="singh";
 userTemp.isActive='NO';
 userTemp.roles=[this.allRoles[1], this.allRoles[0]];


 // set userTemp to signupForm
 this.signupForm.patchValue(userTemp);
// this.signupForm.setValue(userTemp);
  }
resetRegisterForm(form:FormGroup){
  form.reset();
}

createRole(){
  
}







  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
