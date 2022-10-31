import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    // MatToolbarModule,
    // MatButtonModule,
    // MatSidenavModule,
    // MatIconModule,
    // MatListModule,
    // MatCardModule,
    // MatSelectModule,
    // MatInputModule,
    // MatDialogModule,
    // MatMenuModule,
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
})
export class MainMaterialModule {}
