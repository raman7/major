import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes,Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {LoginService} from '../login-service.service'
import {FormGroup,
  FormControl,
  Validators,FormBuilder} from '@angular/forms'  

  
@Component({
  selector: 'app-faculty-login',
  templateUrl: './faculty-login.component.html',
  styleUrls: ['./faculty-login.component.css']
})
export class FacultyLoginComponent implements OnInit {

  public username=new FormControl('');
  public password=new FormControl('',Validators.required);

  constructor(private router:Router,private auth:AuthenticationService,private loginService:LoginService,private fb:FormBuilder) { }

  ngOnInit() {
    if(Cookie.get("isLoggedIn")=="1")
    this.router.navigate(['postQuestion']);

    this.form=this.fb.group({
      'username':this.username,
      'password':this.password,
  
    });
  }


  form:FormGroup;


 

  isLoggedIn:boolean=false

  checkLogin(){
    // validate the user here
    
    if(this.username.value==''||this.password.value==''){
      alert("Username/Password cannot be empty");
    }
    else{
      var user={
         username:this.username.value,
         password:this.password.value
       };
     
       console.log(user);
       
       this.loginService.facultyLogin(user)
       .subscribe(res => {
         console.log(res);
         if(res.result==1){
             this.isLoggedIn=true;
      
        Cookie.set('username', this.username.value);
        Cookie.set('isFacultyLoggedIn',"1");
        this.auth.setUserName(res.value.username);
        this.auth.setStudentLogin(true);
        this.auth.setFacultyDetails(res.value.map);
          console.log(res.value);
          
        this.router.navigate(['postQuestion']);
           }
         else{
           this.isLoggedIn=false;
          alert("invalid user");
          }
       })
     }


    }
  }
