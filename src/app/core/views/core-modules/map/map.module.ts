import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map/map.component';
import { MapMaterialModule } from './map-material.module';


@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    MapMaterialModule
  ]
})
export class MapModule { }
