import { Injectable } from '@angular/core';
import { UserInfo } from 'src/app/entity/user-info';
import { HttpClient } from '@angular/common/http';
import { API__BACKEND_URL } from 'src/app/app.constants';
import { Role } from 'src/app/entity/role';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }

  fetchAllUsers(){
    return this.httpClient.get<UserInfo[]>(`${API__BACKEND_URL}/user-list`);

  }
  fetchAllRoles(){
    return this.httpClient.get<Role[]>(`${API__BACKEND_URL}/fetch-roles`)
  }
  fetchUserById(userId: number){
    return this.httpClient.get<UserInfo>(`${API__BACKEND_URL}/getSingleUser/${userId}`);

  }

  deleteEmployee(userId:number){
    return this.httpClient.delete(`${API__BACKEND_URL}/user-delete/${userId}`);

  }
  updateUser(userId, userInfoData){
    //alert("inside update service")
    return this.httpClient.put(
          `${API__BACKEND_URL}/user-update/${userId}`, userInfoData);
  }

  createNewUser(userInfoData){
    return this.httpClient.post(`${API__BACKEND_URL}/user-create`
                , userInfoData);
  }
}
