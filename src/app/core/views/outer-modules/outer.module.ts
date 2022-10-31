import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { OuterMaterialModule } from './outer-material.module';
@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OuterMaterialModule,
  ],
})
export class OuterModule {}
