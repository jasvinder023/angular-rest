import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from 'src/app/service/employee/employee-data.service';
import { Department, Employee } from '../employee-list/employee-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AUTHENTICATED_USER } from 'src/app/service/auth/authentication.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

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

   console.log("emp id " +this.empId)

    this.employee = new Employee(this.empId,'','','','','','');
    
    if(this.empId!=-1) {
      this.employeeDataService.retrieveEmployee(this.userName, this.empId)
          .subscribe (
            data => this.employee = data

          )
          console.log(this.employee)

    }
  }

  saveEmployee() {
   // alert("save emp" +this.employee.department[0].deptName)
    if(this.empId == -1) { //=== ==
      this.employeeDataService.createEmployee(this.userName, this.employee)
          .subscribe (
            data => {
              console.log(data)
              //this.router.navigate(['employee'])
              this.router.navigate(['../'], {relativeTo: this.route});
            }
          )
    } else {
      //alert("update");
      this.employeeDataService.updateEmployee(this.userName, this.empId, this.employee)
          .subscribe (data => {
              console.log(data)
              console.log("defore")
                     
            // this.employee = data.constructor
             // this.router.navigate(['employee'])
            this.router.navigate(['../'], {relativeTo: this.route});

            }
          )
    }
  }

}
