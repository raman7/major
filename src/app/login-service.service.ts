import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  constructor(private http:Http) { }

isValidUser(user){
   var headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('api/studentLogin',JSON.stringify(user),{headers:headers})
  .map(res=>res.json()); 
  }

facultyLogin(user){
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('api/facultyLogin',JSON.stringify(user),{headers:headers})
  .map(res=>res.json()); 
}

postQuestion(question){
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('api/postQuestion',JSON.stringify(question),{headers:headers})
  .map(res=>res.json()); 
}

getQuestions(data){
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('api/getQuestions',JSON.stringify(data),{headers:headers})
  .map(res=>res.json());
}

getAnsweredQuestions(data){
  // console.log(data);
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('api/getAnsweredQuestions',data,{headers:headers})
  .map(res=>res.json());
}

run(code){
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('api/run',JSON.stringify(code),{headers:headers})
  .map(res=>res.json());
}

compile(code){
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('api/compile',JSON.stringify(code),{headers:headers})
  .map(res=>res.json());
}

submitMarks(marks){
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('api/submit',JSON.stringify(marks),{headers:headers})
  .map(res=>res.json());
}

getMarks(data){
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('api/getMarks',JSON.stringify(data),{headers:headers})
  .map(res=>res.json());
}

getStudentMarks(data){
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('api/getStudentMarks',JSON.stringify(data),{headers:headers})
  .map(res=>res.json());
}

saveMarks(marks){
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('api/saveMarks',JSON.stringify(marks),{headers:headers})
  .map(res=>res.json());
}

isValidAdmin(user) {
  var  headers  =  new  Headers();
  headers.append('Content-Type', 'application/json');
  return  this.http.post('api/adminLogin', JSON.stringify(user), {
      headers: headers
    })
    .map(res => res.json()); 
}



}