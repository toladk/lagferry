
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TerminalDetailComponent } from './terminal-detail/terminal-detail.component';
import { TerminalListComponent } from './terminal-list/terminal-list.component';

const routes: Routes = [
  { path: '', component: TerminalListComponent },
  { path: ':id', component: TerminalDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerminalRoutingModule { }
