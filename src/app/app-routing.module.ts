import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicationComponent } from './publication/publication.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'publicacao/form', component: PublicationComponent },
  { path: 'publicacao/list', component: PublicationListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
