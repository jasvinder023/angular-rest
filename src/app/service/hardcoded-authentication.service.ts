import { Injectable } from '@angular/core';
import { AUTHENTICATED_USER } from './basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  // authenticate(username, password) {
  //   //console.log('before ' + this.isUserLoggedIn());
  //   if(username==="jasvinder" && password === 'dummy') {
  //     sessionStorage.setItem('authenticaterUser', username);
  //     //console.log('after ' + this.isUserLoggedIn());
  //     return true;
  //   }
  //   return false;
  // }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER)
  }

}
