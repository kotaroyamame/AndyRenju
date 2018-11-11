import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopComponent } from './contents/top/top.component';
import { RenjuComponent } from './renju/renju.component';

const routes: Routes = [
  {
    path: '',
    component: TopComponent,
  },
  {
    path: 'renju/',
    component: RenjuComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
