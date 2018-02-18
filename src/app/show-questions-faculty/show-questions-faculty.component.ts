import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login-service.service'
import {Question} from '../Question'

@Component({
  selector: 'app-show-questions-faculty',
  templateUrl: './show-questions-faculty.component.html',
  styleUrls: ['./show-questions-faculty.component.css']
})
export class ShowQuestionsFacultyComponent implements OnInit {

  selectedYear:string
  selectedSection:string
  week:string
  questions:Question[]
  showQuestions:boolean=false

  constructor(private loginService:LoginService) { }

  ngOnInit() {
  }

getQuestions(){
  this.questions=[];
  var data={
    year:this.selectedYear,
    section:this.selectedSection,
    week:this.week,
    
  }
  this.loginService.getQuestions(data)
  .subscribe(res=>{
    this.questions=res;
    this.showQuestions=true;
  });

}


}
