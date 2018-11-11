import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopComponent } from './contents/top/top.component';
import { RenjuComponent } from './contents/renju/renju.component';
import { ChatComponent } from './contents/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: TopComponent,
  },
  {
    path: 'renju',
    component: RenjuComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
