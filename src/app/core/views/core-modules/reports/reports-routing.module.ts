import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportMgtComponent } from './report-mgt/report-mgt.component';
import { ReportCategoriesComponent } from './report-categories/report-categories.component';

const routes: Routes = [
  { path: '', component: ReportMgtComponent },
  { path: 'categories-mgt', component: ReportCategoriesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
