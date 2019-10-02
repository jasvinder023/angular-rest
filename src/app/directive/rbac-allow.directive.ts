import {Directive, Input, OnDestroy, TemplateRef, ViewContainerRef} from "@angular/core";

import {Subscription} from "rxjs";
import * as _ from 'lodash';
import { TOKEN } from '../service/basic-authentication.service';

@Directive({
    selector:"[rbacAllow]"
})
export class RbacAllowDirective //implements OnDestroy { 
    {

    allowedRoles:string[];
    rolesList:string[];
  //  user:User;

    sub:Subscription;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef){
            
       // private authService: AuthService) {

        // this.sub = authService.user$.subscribe(
        //     user => {
        //         this.user = user;
        //         this.showIfUserAllowed();
        //     });
    }

    // ngOnDestroy() {
    //     this.sub.unsubscribe();
    // }

    @Input()
    set rbacAllow(allowedRoles: string[]) {
        this.allowedRoles = allowedRoles;

            // add roles to sessionStorage here
          let jwtToken=  sessionStorage.getItem(TOKEN);
            //let jwtToken=data.token;
            let jwtData = jwtToken.split('.')[1]
            let decodedJwtJsonData = window.atob(jwtData)
            let decodedJwtData = JSON.parse(decodedJwtJsonData)

             this.rolesList= decodedJwtData.AUTHORITY
             sessionStorage.setItem("role", decodedJwtData.AUTHORITY);

          ///  sessionStorage.setItem("role",rolesList);

            console.log('jwtData: ' + jwtData)
            console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
            console.log('decodedJwtData: ' + decodedJwtData)
            console.log('Roles: ' + this.rolesList); 


        this.showIfUserAllowed();
    }

     showIfUserAllowed() {

    //     if (!this.allowedRoles || this.allowedRoles.length === 0 ||
    //         !this.user) {
    //         this.viewContainer.clear();
    //         return;
    //     }

        const isUserAllowed =
             _.intersection(this.allowedRoles, this.rolesList).length > 0;

             console.log("Role name*******" +this.allowedRoles, this.rolesList)
             //alert("is allowed => " +isUserAllowed)

         if (isUserAllowed) {
             this.viewContainer.createEmbeddedView(this.templateRef);
         }
         else {
             this.viewContainer.clear();
         }

     }

}



