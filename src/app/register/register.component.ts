import { BasicAuthenticationService } from './../service/basic-authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


export class User {
  constructor(
    
    public username: string,
    public password: string,
    public firstname: string,
    public lastname: string,
    public email:string
    
  ){

  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username='';
  password='';
  role='';
  user:User
  constructor(private basicAuthenticationService: BasicAuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

   roles:Array<Object> =[
     {id:0 ,name:'Admin' },
     {id:1,name:'Manager'}
    
    ]

    selectedRole=this.roles[1];

    handleRegister(){
      console.log(this.username+""+this.password)
      this.user=new User(this.username,this.password,'','','');
    this.basicAuthenticationService.executeRegister(this.user)
    .subscribe (
      data => {
        console.log(data)
        this.router.navigate(['employee'])
      }
    )   
   
} 
    }



