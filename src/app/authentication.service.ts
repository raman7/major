import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthenticationService {

  private studentLoggedIn:Subject<boolean>=new Subject<boolean>();
  private facultyLoggedIn:Subject<boolean>=new Subject<boolean>();
  private user:Subject<string>=new Subject<string>();
  private year:Subject<string>=new Subject<string>();
  private section:Subject<string>=new Subject<string>();
private userState:boolean;

username:string=""
studentYear:string=""
studentSection:string=""
facDetails
studentDetails

get userName(){
  return this.user.asObservable();
}

get userSection(){
  return this.section.asObservable();
}
get userYear(){
  return this.year.asObservable();
}

  get isStudentLoggedIn()
  {
    // console.log(typeof this.studentLoggedIn.asObservable() );
    return this.studentLoggedIn.asObservable(); 
  }
  
  get isFacultyLoggedIn()
  {
    return this.studentLoggedIn.asObservable(); 
  }
  

  constructor() { }
  


  setUserName(value){
    this.user.next(value);
    this.username=value;
  }

  setSection(value){
    this.section.next(value);
    this.studentSection=value;
  }
  
  setUserYear(value){
    this.year.next(value);
    this.studentYear=value;
  }

  setStudentLogin(value){
    this.userState=value;
    this.studentLoggedIn.next(value);
  }

  setStudentDetails(value){
    this.studentDetails=value;
  }

  getStudentDetails(){
    return this.studentDetails;
  }

  setFacutlyLogin(value){
    this.facultyLoggedIn.next(value);
  }
  setFacultyDetails(value){
this.facDetails=value;
  }

  getFacultyDetails(){
    return this.facDetails;
  }

  getUserState(){
    return this.userState;
  }

  getUserName(){
    return this.username;
  }

  getUserYear(){
    return this.studentYear;
  }

  getUserSection(){
    return this.studentSection
  }

}
