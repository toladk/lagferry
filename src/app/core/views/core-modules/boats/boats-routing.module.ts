import { BoatsComponent } from './boats/boats.component';
import { BoatDetailsComponent } from './boat-details/boat-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: BoatsComponent },
  { path: ':id', component: BoatDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoatsRoutingModule { }
