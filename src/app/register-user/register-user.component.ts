import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes,Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {RegisterService} from '../register.service'
import {FormGroup,
  FormControl,
  Validators,FormBuilder} from '@angular/forms'  

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})

export class RegisterUserComponent implements OnInit {

  form:FormGroup
  public username=new FormControl('',Validators.required);
  public password = new FormControl('',Validators.required);
  public year=new FormControl('',Validators.required)
  public section=new FormControl('',Validators.required)


  isRegistered:boolean


  constructor( private _registerService:RegisterService,private router:Router,private fb:FormBuilder) { }

  ngOnInit() {

    this.form=this.fb.group({
      'username':this.username,
      'password':this.password,
      'year':this.year,
      'section':this.section
    });

  }

  registerUser(){
    if(this.username.value==''||this.password.value==''){
      alert("Username/Password cannot be empty");
    }
    else{
      
      let user={
         username:this.username.value,
         password:this.password.value,
         section:this.section.value,
         year:this.year.value,
         marks:0
       };
       
       
       this._registerService.registerUser(user)
       .subscribe(res => {

        alert(res.msg);
        this.router.navigate(['login']);
       })
     
  }


}
}
