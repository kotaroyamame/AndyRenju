import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RenjuComponent } from './contents/renju/renju.component';
import { ContentsComponent } from './contents/contents.component';
import { TopComponent } from './contents/top/top.component';
import { CoreModule } from './core/core.module';
import { ChatComponent } from './contents/chat/chat.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

@NgModule({
	declarations: [
		AppComponent,
		RenjuComponent,
		ContentsComponent,
		TopComponent,
		ChatComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CoreModule,
		BrowserAnimationsModule,
		MatButtonModule, MatCheckboxModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
