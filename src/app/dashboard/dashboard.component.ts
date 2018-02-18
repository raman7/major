import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {QueServiceService} from '../que-service.service'
import {LoginService} from '../login-service.service'
import {Question} from '../Question'

import { RouterModule, Routes,Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent implements OnInit {

 
  questions:Question[]
  selectedQuestion:object
  isReturned:boolean=false
  selectedWeek:number
  showQuestions:boolean=false
  selectedYear:number
  noQuestions:boolean=false
 
  answeredQuestions
  displayQuestions:Question[]=[]
  k:number=0

  form:FormGroup
  week:FormControl

  constructor(
    private queService:QueServiceService,
    private fb:FormBuilder,
    private _loginService:LoginService,
    private router:Router,
    private authService:AuthenticationService) { }

  ngOnInit() {
      this.form=this.fb.group({
        week:['',Validators.required]
      });
  }

  sendQuestion(question) {
    this.queService.selectedQuestion(question);
    console.log(question);
    this.router.navigate(['editor']);
  }

  showQuestionForWeek() {
    this.displayQuestions = [];
    var query = {
      username: this.authService.getUserName()
    }
    this._loginService.getAnsweredQuestions(query)
      .subscribe(res => {
        this.answeredQuestions = res;
        console.log(this.answeredQuestions);
        this.getTotalQuestions();
      });
  }
     
  onChangeWeek(){
    this.displayQuestions = [];
  }
  getTotalQuestions() {
    var data = {
      week: this.form.get('week').value,
      year: this.authService.getUserYear(),
      section: this.authService.getUserSection()
    }
    console.log(data);
    this._loginService.getQuestions(data).subscribe(res => {
        this.questions = res;
        //console.log(this.questions);   
        if (this.questions.length == 0)
          this.noQuestions = true;
        else {
          this.noQuestions = false;
          Cookie.set('week', this.form.get("week").value + "");
          this.showQuestions = true;

          if (this.answeredQuestions.length == 0) {
            this.displayQuestions = this.questions;
          } else {
            // console.log(this.questions);
            this.calculateArray();
          }
        }
      });
  }
  calculateArray() {
    let aq = this.answeredQuestions[0]['marks'];

    //array of objects..
    console.log(aq);
    console.log(this.questions);

    

    let i,j;
    for ( i = 0; i < this.questions.length; i++) { 
      for ( j = 0; j < aq.length; j++) {
        if (aq[j].qid != this.questions[i]['_id']) {
         this.displayQuestions.push(this.questions[i])
        }
      }
    
    }


    console.log(this.displayQuestions);
  }

}




  

