import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { SideberComponent } from './sideber/sideber.component';
@NgModule({
  declarations: [HeaderComponent, SideberComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    SideberComponent
  ]
})
export class CoreModule { }
