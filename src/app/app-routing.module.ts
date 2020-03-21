import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { AuthenticationViewComponent } from './views/authentication-view/authentication-view.component';
import { LogViewComponent } from './views/log-view/log-view.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeViewComponent, canActivate: [AuthGuardService] },
  { path: 'home', component: HomeViewComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: AuthenticationViewComponent },
  { path: 'log/:id', component: LogViewComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
