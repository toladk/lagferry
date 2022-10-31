import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CrewMembersComponent } from './crew-members.component';
import { CrewMembersMaterialModule } from './crew-members-material.module';
import { CrewMembersRoutingModule } from './crew-members-routing.module';
import { AddCrewModalComponent } from './add-crew-modal/add-crew-modal.component';


@NgModule({
  declarations: [
    CrewMembersComponent,
    AddCrewModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CrewMembersRoutingModule,
    CrewMembersMaterialModule,
    AngularSvgIconModule.forRoot()
  ]
})
export class CrewMembersModule { }
