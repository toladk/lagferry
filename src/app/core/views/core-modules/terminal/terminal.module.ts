import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalListComponent } from './terminal-list/terminal-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TerminalMaterialModule } from './terminal-material.module';
import { TerminalRoutingModule } from './terminal-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CreateTerminalDialogComponent } from './create-terminal-dialog/create-terminal-dialog.component';
import { CreateScheduleDialogComponent } from 'src/app/core/views/core-modules/terminal/create-schedule-dialog/create-schedule-dialog.component';
import { TerminalDetailComponent } from './terminal-detail/terminal-detail.component';

@NgModule({
  declarations: [
    TerminalListComponent,
    CreateTerminalDialogComponent,
    CreateScheduleDialogComponent,
    TerminalDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    TerminalMaterialModule,
    TerminalRoutingModule,
  ]
})
export class TerminalModule { }
