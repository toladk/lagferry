import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportMgtComponent } from './report-mgt/report-mgt.component';
import { ReportsMaterialModule } from './reports-material.module';


@NgModule({
  declarations: [
    ReportMgtComponent
  ],
  imports: [
    CommonModule,
    ReportsMaterialModule,
    ReportsRoutingModule,
  ]
})
export class ReportsModule { }
