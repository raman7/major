import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultyLoginRoutingModule } from './faculty-login-routing.module';
import { FacultyLoginComponent } from './faculty-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FacultyLoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    FacultyLoginComponent
  ]
})
export class FacultyLoginModule { }
