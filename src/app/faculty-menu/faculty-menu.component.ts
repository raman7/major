import { AuthenticationService } from './../authentication.service';
import { Component, OnInit,Inject } from '@angular/core';
import {Student} from '../Student'
import {LoginService} from '../login-service.service'
import * as jsPDF from 'jspdf-autotable';

@Component({
  selector: 'app-faculty-menu',
  templateUrl: './faculty-menu.component.html',
  styleUrls: ['./faculty-menu.component.css'],
  providers:[{provide: 'Window',  useValue: window}]
})
export class FacultyMenuComponent implements OnInit {

  year:number
  section:string
  viewMarks:boolean=false
  students:Student[]
  marksScored:number=0

  facDetails=[]

  constructor( @Inject('Window') private window: Window,private auth:AuthenticationService,private _loginService:LoginService) { }

  ngOnInit() {
    this.facDetails=this.auth.getFacultyDetails();
  }

  getMarks(){
    var data={
      year:this.year,
      section:this.section
    }
    this._loginService.getMarks(data)
    .subscribe(res=>{
        console.log(res); 
        this.students=res;
        this.viewMarks=true;
    });
    
  }

  download(){
    var columns=['UserName','Marks'];
    var rows=[];
    for(let i=0;i<this.students.length;i++)
    {
      rows.push([this.students['username']]);
    }
   
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows);

    doc.save('table.pdf');
    
   // doc.save('code.pdf');
  }

}
