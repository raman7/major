import { RegisterUserComponent } from './register-user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdlShadowModule, MdlButtonModule, MdlTextFieldModule, MdlCardModule, MdlRadioModule, MdlRadioGroupRegisty } from '@angular-mdl/core';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    MdlShadowModule,
    MdlButtonModule,
    ReactiveFormsModule,
    MdlTextFieldModule,
    MdlCardModule,
    MdlRadioModule,
    
  ],
  providers:[MdlRadioGroupRegisty],
  declarations: [RegisterUserComponent]
})
export class RegisterModule { }
