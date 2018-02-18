import { AuthenticationService } from './../authentication.service';
import { Faculty } from './../Faculty';
import { MappingService } from './../mapping.service';
import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login-service.service'
import {Router} from '@angular/router'
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.css']
})

export class PostQuestionComponent implements OnInit {

  n
  selectedYear=1;
  selectedSection="";
  showTestInputBox=false;
  questionName;
  input=[]
  output=[]
  question
  week
  showDownloadMarks=false
  arr=[]

  facDetails=[]


  constructor(private _loginService:LoginService,private auth:AuthenticationService,private router:Router,private map:MappingService) { }

  ngOnInit() {
    this.facDetails=this.auth.getFacultyDetails();
    console.log(this.facDetails);
  }

  //Function which shows current questions for a faculty
  showExistingQuestions(){
    
  }


  testCases(){
    for(var i=0;i<this.n;i++)
    this.arr[i]=i;
    this.showTestInputBox=true;
  }

  submitQuestion(){
    alert("Are you Sure you want to submit ?");
    var newQuestion = {
        name:this.questionName,
        question:this.question,
        week:this.week,
        year:this.selectedYear,
        section:this.selectedSection,
        input:this.input,
        output:this.output,
        postedBy:Cookie.get('username')
    }
    this._loginService.postQuestion(newQuestion)
    .subscribe(res => {
      
      alert(res.msg)
      
    })
  }

  showMarksMenu(){
    this.showDownloadMarks=!this.showDownloadMarks;
  }

}
