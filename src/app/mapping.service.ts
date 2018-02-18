import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MappingService {

  constructor(private http:Http) { }

  getFaculty(){
    return this.http.get('api/getfaculty').map(res=>res.json())
  }

  mapFaculty(data){
    console.log("inservice",data);
    var headers=new Headers()
    headers.append('content-type','application/json');
    return this.http.post('api/assignSection',data)
    .map(res=>res.json())
    }

    removeFaculty(data){
      console.log("inservice remove faculty",data);
      var headers=new Headers()
      headers.append('content-type','application/json');
      return this.http.post('api/deleteSection',data)
      .map(res=>res.json())
    }
  }

