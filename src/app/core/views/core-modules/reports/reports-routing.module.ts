import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportMgtComponent } from './report-mgt/report-mgt.component';

const routes: Routes = [
  { path: '', component: ReportMgtComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
