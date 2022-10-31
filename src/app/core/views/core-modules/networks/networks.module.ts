import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetworksRoutingModule } from './networks-routing.module';
import { NetworkListComponent } from './network-list/network-list.component';


@NgModule({
  declarations: [
    NetworkListComponent
  ],
  imports: [
    CommonModule,
    NetworksRoutingModule
  ]
})
export class NetworksModule { }
