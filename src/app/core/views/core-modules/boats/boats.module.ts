
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoatsRoutingModule } from './boats-routing.module';
import { BoatsComponent } from './boats/boats.component';
import { BoatsMaterialModule } from './boats-material.module';
import { AddBoatModalComponent } from './dailogs/add-boat-modal/add-boat-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BoatDetailsComponent } from './boat-details/boat-details.component';
import { BoatMoreDetailsModalComponent } from './dailogs/boat-more-details-modal/boat-more-details-modal.component';
import { EditBoatModalComponent } from './dailogs/edit-boat-modal/edit-boat-modal.component';
import { AddBoatCrewModalComponent } from './dailogs/add-boat-crew-modal/add-boat-crew-modal.component';
import { BoatTrackerModalComponent } from './dailogs/boat-tracker-modal/boat-tracker-modal.component';
import { BoatDeleteTrackerModalComponent } from './dailogs/boat-delete-tracker-modal/boat-delete-tracker-modal.component';


@NgModule({
  declarations: [
    BoatsComponent,
    AddBoatModalComponent,
    BoatDetailsComponent,
    BoatMoreDetailsModalComponent,
    EditBoatModalComponent,
    AddBoatCrewModalComponent,
    BoatTrackerModalComponent,
    BoatDeleteTrackerModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
    BoatsMaterialModule,
    BoatsRoutingModule
  ]
})
export class BoatsModule { }
