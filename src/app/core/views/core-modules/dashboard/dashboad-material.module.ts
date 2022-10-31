import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  imports: [],
  exports: [
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
  ],
})
export class DashboardMaterialModule {}
