import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportMgtComponent } from './report-mgt/report-mgt.component';
import { ReportsMaterialModule } from './reports-material.module';
import { ReportCategoriesComponent } from './report-categories/report-categories.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CreateReportCategoryModalComponent } from './dialogs/create-report-category-modal/create-report-category-modal.component';
import { UpdateReportCategoryModalComponent } from './dialogs/update-report-category-modal/update-report-category-modal.component';


@NgModule({
  declarations: [
    ReportMgtComponent,
    ReportCategoriesComponent,
    CreateReportCategoryModalComponent,
    UpdateReportCategoryModalComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularSvgIconModule,
    ReportsMaterialModule,
    ReportsRoutingModule,
  ]
})
export class ReportsModule { }
