import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from '../../../pages/dashboard/dashboard.component'
import {AuthGuard} from '../../../auth/guards/auth.guard'
import { PagesComponent } from '../../../pages/pages.component';
import { BaseBandejaComponent } from './base-bandeja/base-bandeja.component';

const routes: Routes = [
  {path: 'dashboard', component: PagesComponent,
  canActivate:[AuthGuard],
  children: [
    {path: '', component: DashboardComponent,  data: {titulo: 'DataBase'}},
     {path: "bandeja/:idMenu",component: BaseBandejaComponent,data: {titulo: 'Product'}},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BandejasRoutingModule { }
