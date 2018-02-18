import { Injectable } from '@angular/core';

@Injectable()
export class UserAccountService {

  isLoggedIn:boolean;
  uname:string;
  password:string;

  constructor() { }

setCredentials(credentials){
  this.isLoggedIn=credentials.isLoggedIn;
  this.uname=credentials.uname;
}

getCredentials(){
  return {"uname":this.uname,"isLoggedIn":this.isLoggedIn};
}


}
