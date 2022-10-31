import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrewMembersComponent } from './crew-members.component';

const routes: Routes = [{ path: '', component: CrewMembersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrewMembersRoutingModule { }
