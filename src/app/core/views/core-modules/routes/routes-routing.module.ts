import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteListComponent } from './route-list/route-list.component';

const routes: Routes = [
  { path: '', component: RouteListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
