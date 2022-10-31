import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  imports: [
  ],
  exports: [
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class UserMaterialModule {}
