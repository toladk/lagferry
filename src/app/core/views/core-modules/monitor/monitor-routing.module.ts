import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitorMgtComponent } from './monitor-mgt/monitor-mgt.component';

const routes: Routes = [
  { path: '', component: MonitorMgtComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }
