import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import {PagesComponent} from '../../../pages/pages.component';
import { CreateOutboundComponent } from './create-outbound/create-outbound.component';
import { CreateTrasnferComponent } from './create-trasnfer/create-trasnfer.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { ReturnOrderComponent } from './return-order/return-order.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';

const routes: Routes = [
  {path: 'dashboard', component: PagesComponent,
  canActivate:[AuthGuard],
  children: [
    {path: '', component: DashboardComponent,  data: {titulo: 'DataBase'}},
    {path: 'list-orders', component: ListOrdersComponent, data: {titulo: 'LIST OF SALES ORDER'}},
    {path: 'sales-order/:id', component: SalesOrderComponent, data: {titulo: 'Sales Orders'}},
    {path: 'create-trasnfer', component: CreateTrasnferComponent, data: {titulo: 'Trasnfer Orders Screen'}},
    {path: 'return-order', component: ReturnOrderComponent, data: {titulo: 'Return Order'}},
    {path: 'create-outbound', component: CreateOutboundComponent, data: {titulo: 'OutBound Delivery Screen'}},
    
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
