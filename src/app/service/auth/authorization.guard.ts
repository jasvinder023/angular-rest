
import {tap, first, map} from 'rxjs/operators';

import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

import * as _ from 'lodash';
import {Injectable} from "@angular/core";
import { TOKEN } from './authentication.service';

@Injectable()
export class AuthorizationGuard implements  CanActivate {
    rolesList:string[];

    msg="";
    constructor(private allowedRoles:string[],
                 private router:Router) {

    }


    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
            let jwtToken=  sessionStorage.getItem(TOKEN);
            //let jwtToken=data.token;
            let jwtData = jwtToken.split('.')[1]
            let decodedJwtJsonData = window.atob(jwtData)
            let decodedJwtData = JSON.parse(decodedJwtJsonData)

             this.rolesList= decodedJwtData.AUTHORITY
            if(_.intersection(this.allowedRoles, this.rolesList).length > 0 ){
               // alert("true")
                return true
            }else{
                console.log("false redirect to home")
                
                //this.router.navigateByUrl(['error',-1]);
                this.router.navigate(['error',"Anuthorized Access"])
                 return false;
            }
        // return this.authService.user$.pipe(
        //     map(user => _.intersection(this.allowedRoles, user.roles).length > 0 ),
        //     first(),
        //     tap(allowed => {
        //         if (!allowed) {
        //             this.router.navigateByUrl('/');
        //         }
        //     }),);


    }

}