import { Injectable } from '@angular/core';

@Injectable()
export class QueServiceService {

  question:object
  input:string[]
  output:string[]

  constructor() { }

  selectedQuestion(question){
    this.question=question;
    this.input=question.input;
    this.output=question.output;
  }
getSelectedQuestion(){
  return this.question;
}

getOutput(){
  return this.output;
}

getInput(){
return this.input;
}
}
