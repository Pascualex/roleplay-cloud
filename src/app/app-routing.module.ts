import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { LogViewComponent } from './views/log-view/log-view.component';

const routes: Routes = [
  { path: '', component: HomeViewComponent },
  { path: 'log/:id', component: LogViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
