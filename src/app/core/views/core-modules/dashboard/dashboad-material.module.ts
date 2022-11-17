import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [],
  exports: [
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule
  ],
})
export class DashboardMaterialModule {}
