import { Component, OnInit } from '@angular/core';
import { AUTHENTICATED_USER } from 'src/app/service/auth/authentication.service';
import { EmployeeDataService } from 'src/app/service/employee/employee-data.service';
import { Router, ActivatedRoute } from '@angular/router';

export class Department{

  constructor(
    public deptId:number,
    public deptName:string
  ){}
}
export class Employee{
  constructor(
    public empId:number,
    public firstName:string,
    public lastName:string,
    public gender:string,
    public birthDate:string,
    public hireDate:string,

       public deptName:String,
  ){

  }
}
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees : Employee[];
  message: string;
  roleName:string;
  userName=sessionStorage.getItem(AUTHENTICATED_USER);

 
  constructor(
    private employeeDataService: EmployeeDataService,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) { }
 
  ngOnInit() {
  // alert("list comp");
    //this.toParentUserName.emit(this.userName);
    this.roleName=sessionStorage.getItem("role");
    console.log("Fetch role=> " +this.roleName)

    this.refreshEmployees();
  }


  refreshEmployees(){
 //  alert("list emp1")
    this.employeeDataService.retrieveAllEmployees(this.userName)
    .subscribe(response => {      

    this.employeeDataService.retrieveAllEmployees(this.userName).subscribe(
      response => {      
        console.log(response);
        this.employees = response;

        console.log(response);
      }
    )
  }
 
  editEmployee(id) {
    console.log(`update ${id}`)
    this.router.navigate(['employee',id,{relativeTo: this.activatedRoute}])
  }

  deleteEmployee(id){
    this.employeeDataService.deleteEmployee(this.userName,id).subscribe(
      response =>{
        this.message = `Delete of Employee ${id} Successful!`;
        this.refreshEmployees();
      }
    )
  }
  addEmployee() {
    this.router.navigate(['employee',-1])
  }



}
