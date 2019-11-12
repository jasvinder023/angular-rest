import { Component, OnInit } from '@angular/core';
import { AuthenticationService, AUTHENTICATED_USER } from '../service/auth/authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private authService:AuthenticationService) { }
  

  ngOnInit() {
    this.authService.sendUserNameEvent(sessionStorage.getItem(AUTHENTICATED_USER));

  }

}
