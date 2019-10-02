import { HardcodedAuthenticationService } from './../service/hardcoded-authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
    private hardcodedAuthenticationService: HardcodedAuthenticationService
  ) { }

  ngOnInit() {
    this.hardcodedAuthenticationService.logout();
    this.router.navigate(['login'])
  }

}
