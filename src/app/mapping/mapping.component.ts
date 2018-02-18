import { FormBuilder,ReactiveFormsModule,FormGroup } from '@angular/forms';
import { Faculty } from './../Faculty';
import { MappingService } from './../mapping.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {

  faculty:Faculty[]=[];
  map_object:Object[]=[];
  name:string;
  year:number;
  section:string;
  
  
  constructor(private mapping:MappingService) {
    
   }

  ngOnInit() {
     this.mapping.getFaculty().subscribe(res=>{
       this.faculty=res
       
       for(let i=0;i<this.faculty.length;i++){
           this.map_object[i]=res[i].map;
       }

       console.log(this.map_object);
       
     })
  }

  mapFaculty(){ 
    const newMap={
     name:this.name,
     map:{
      year:this.year,
      section:this.section
     }
    }
    console.log(newMap);
    
    this.mapping.mapFaculty(newMap).subscribe((res)=>{
      console.log("return data",res);
      this.ngOnInit()
    })
  }

  removeFaculty(name,year,section){
    const d_map={
      name,
      year,
      section
    }
 
    this.mapping.removeFaculty(d_map).subscribe(res=>{
      console.log(res); 
      this.ngOnInit();
    })
   }

}
