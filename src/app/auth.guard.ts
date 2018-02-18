import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class AuthGuard implements CanActivate {
  
  
  constructor(private route:Router,private auth:AuthenticationService){
  }


  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
    let res=this.auth.getUserState();
    if(!res){
      this.route.navigate(['login']);
  }
  return this.auth.getUserState();
}
}
