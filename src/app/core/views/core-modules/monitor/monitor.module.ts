import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorMgtComponent } from './monitor-mgt/monitor-mgt.component';
import { AddCameraModalComponent } from './dialogs/add-camera-modal/add-camera-modal.component';
import { AddTrackerModalComponent } from './dialogs/add-tracker-modal/add-tracker-modal.component';
import { MonitorMaterialModule } from './monitor-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRouteDialogComponent } from './dialogs/add-route-dialog/add-route-dialog.component';
import { AngularSvgIconModule } from "angular-svg-icon";


@NgModule({
  declarations: [
    MonitorMgtComponent,
    AddCameraModalComponent,
    AddTrackerModalComponent,
    AddRouteDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonitorRoutingModule,
    MonitorMaterialModule,
    AngularSvgIconModule,
  ]
})
export class MonitorModule { }
