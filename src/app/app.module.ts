import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RenjuComponent } from './renju/renju.component';
import { ContentsComponent } from './contents/contents.component';
import { TopComponent } from './contents/top/top.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    RenjuComponent,
    ContentsComponent,
    TopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
