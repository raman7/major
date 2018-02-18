import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacultyLoginComponent } from './faculty-login.component';

const routes: Routes = [
  {
    path:'',
    component:FacultyLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultyLoginRoutingModule { }
