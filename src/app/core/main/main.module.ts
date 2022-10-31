import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainMaterialModule } from './main-material.module';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { SideMenuComponent } from './layout/side-menu/side-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { EditProfileComponent } from './layout/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    SideMenuComponent,
    FooterComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule,
    MainMaterialModule,
    AngularSvgIconModule.forRoot(),
  ],
})
export class MainModule {}
