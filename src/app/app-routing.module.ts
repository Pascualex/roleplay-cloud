import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { AuthenticationViewComponent } from './views/authentication-view/authentication-view.component';
import { SearchViewComponent } from './views/search-view/search-view.component';
import { LogViewComponent } from './views/log-view/log-view.component';

const routes: Routes = [
  { path: 'home', component: HomeViewComponent },
  { path: 'login', component: AuthenticationViewComponent },
  { path: 'search', component: SearchViewComponent },
  { path: 'log/:id', component: LogViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
