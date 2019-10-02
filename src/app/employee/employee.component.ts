import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from '../employee-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AUTHENTICATED_USER } from '../service/basic-authentication.service';
import { Employee, Department } from '../list-employee/list-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  empId:number;
  employee :Employee;
  department:Department;
  userName:String;
  
  constructor(
    private employeeDataService: EmployeeDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.userName=sessionStorage.getItem(AUTHENTICATED_USER)
    this.empId = this.route.snapshot.params['empId'];
   //alert(this.empId);

    this.employee = new Employee(this.empId,'','','','','','');
    
    if(this.empId!=-1) {
      this.employeeDataService.retrieveEmployee(this.userName, this.empId)
          .subscribe (
            data => this.employee = data
          )
    }
  }

  saveEmployee() {
   // alert("save emp" +this.employee.department[0].deptName)
    if(this.empId == -1) { //=== ==
      this.employeeDataService.createEmployee(this.userName, this.employee)
          .subscribe (
            data => {
              console.log(data)
              this.router.navigate(['employee'])
            }
          )
    } else {
      this.employeeDataService.updateEmployee(this.userName, this.empId, this.employee)
          .subscribe (
            data => {
              console.log(data)
              this.router.navigate(['employee'])
            }
          )
    }
  }

}
