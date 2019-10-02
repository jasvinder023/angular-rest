import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeeDataService } from '../employee-data.service';
import { Router } from '@angular/router';
import { AUTHENTICATED_USER } from '../service/basic-authentication.service';

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

    //employee has departments
    //public department:Department,

    public deptName:String,
  ){

  }
}
@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  employees : Employee[];
  message: string;
  roleName:string;
  userName=sessionStorage.getItem(AUTHENTICATED_USER);

 // @Output() public toParentUserName=new EventEmitter();
  constructor(
    private employeeDataService: EmployeeDataService,
    private router: Router
  ) { }
 
  ngOnInit() {
  // alert("list comp");
    //this.toParentUserName.emit(this.userName);
    this.employeeDataService.sendUserNameEvent(this.userName);
    this.roleName=sessionStorage.getItem("role");
    console.log("Fetch role=> " +this.roleName)

    this.refreshEmployees();
  }


  //get isAdmin() {
  //  alert("role nnaa" +this.roleName+ "is true " +this.roleName === 'Admin')
//     return this.roleName === 'ADMIN';
// }

  refreshEmployees(){
 //  alert("list emp1")
    this.employeeDataService.retrieveAllEmployees(this.userName).subscribe(
      response => {      
        console.log(response);
        this.employees = response;
     //   alert("customer " +this.customers[0].firstName)
        console.log(response);
      }
    )
  }
 
  updateEmployee(id) {
    console.log(`update ${id}`)
    this.router.navigate(['employee',id])
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
