import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { RouteListComponent } from './route-list/route-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RoutesMaterialModule } from './routes-material.module';
import { AddRouteModalComponent } from './dialogs/add-route-modal/add-route-modal.component';
import { UpdateRouteModalComponent } from './dialogs/update-route-modal/update-route-modal.component';


@NgModule({
  declarations: [
    RouteListComponent,
    AddRouteModalComponent,
    UpdateRouteModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
    RoutesMaterialModule,
    RoutesRoutingModule
  ]
})
export class RoutesModule { }
