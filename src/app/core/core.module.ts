import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { SideberComponent } from './sideber/sideber.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
@NgModule({
	declarations: [HeaderComponent, SideberComponent],
	imports: [
		CommonModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatListModule
	],
	exports: [
		HeaderComponent,
		SideberComponent
	]
})
export class CoreModule { }
