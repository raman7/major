  import { Injectable } from '@angular/core';
  import {Http,Headers} from '@angular/http';

  import 'rxjs/add/operator/map';

  @Injectable()
  export class RegisterService {
    constructor(private http:Http) { }

  registerUser(user){
    
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('api/registerUser',JSON.stringify(user),{headers:headers})
    .map(res=>res.json()); 
    }
  }