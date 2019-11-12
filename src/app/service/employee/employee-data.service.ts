import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPLOYEE_JPA_API_URL } from '../../app.constants';
import { Subject } from 'rxjs';
import { Employee } from 'src/app/employee/employee-list/employee-list.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
      
  
  constructor(private httpClient: HttpClient) {

   }

   retrieveAllEmployees(username){
   return this.httpClient.get<Employee[]>(`${EMPLOYEE_JPA_API_URL}/${username}/list`);
   


  }
  deleteEmployee(username,id){
   // alert("emp data")
    return this.httpClient.delete(`${EMPLOYEE_JPA_API_URL}/${username}/${id}`);
  }

  
  retrieveEmployee(username, id){
    return this.httpClient.get<Employee>(`${EMPLOYEE_JPA_API_URL}/${username}/${id}`);
  }

  updateEmployee(username, id, employee){
    //alert("inside update service")
    return this.httpClient.put(
          `${EMPLOYEE_JPA_API_URL}/${username}`
                , employee);
  }

  createEmployee(username, employee){
    return this.httpClient.post(
              `${EMPLOYEE_JPA_API_URL}/${username}`
                , employee);
  }

}
