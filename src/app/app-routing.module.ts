import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopComponent } from './contents/top/top.component';
import { RenjuComponent } from './contents/renju/renju.component';
import { ChatComponent } from './contents/chat/chat.component';
import { ProfileComponent } from './contents/profile/profile.component';
import { SiteComponent } from './contents/site/site.component';

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
	},
	{
		path: 'profile',
		component: ProfileComponent,
	},
	{
		path: 'site',
		component: SiteComponent,
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
