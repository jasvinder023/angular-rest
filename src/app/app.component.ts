import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //template: '<h1>{{title}}<h1>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = 'Employee';
  message = 'Welcome to Employee Management System';
  //loggedInUserName="";

  constructor(){
    //alert("app-comp ==== const")
  }
  ngOnInit(): void {
    //alert("app-comp")
  }
}