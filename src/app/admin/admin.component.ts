import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './../login-service.service';
import { AuthenticationService } from './../authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  form:FormGroup;


  public username=new FormControl('',Validators.required);
  public password=new FormControl('',Validators.required);

  isLoggedIn:boolean=false
  year:number

  constructor(private router:Router,private loginService:LoginService,private fb:FormBuilder,private auth:AuthenticationService) {
    
  }

  ngOnInit() {

  this.form=this.fb.group({
    'username':this.username,
    'password':this.password,
    'year':this.year
  });


  }


  checkLogin(){
    // validate the user here

    if(this.username.value==''||this.password.value==''){
      alert("Username/Password cannot be empty");
    }
    else{
      var user={
         username:this.username.value,
         password:this.password.value,
       };
     console.log(user);
       //validation part
       this.loginService.isValidAdmin(user)
       .subscribe(res => {
          //console.log(res);
         if(res.result==1){
             this.isLoggedIn=true;
              this.auth.setStudentLogin(true);
              var userDetails=res.userDetails;
            this.auth.setUserName(userDetails.username);
        this.router.navigate(['adminDashboard']);
           }
         else{
           this.isLoggedIn=false;
           alert("Invalid USERNAME/PASSWORD/YEAR!");
       }
       })
     }

  }

}
