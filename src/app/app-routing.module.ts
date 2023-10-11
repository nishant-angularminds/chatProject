import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, profileGuard } from './profile.guard';

const routes: Routes = [

  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) ,canActivate:[profileGuard]},

  { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) ,canActivate:[authGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }