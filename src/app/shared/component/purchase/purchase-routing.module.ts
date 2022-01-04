import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PagesComponent} from '../../../pages/pages.component'
import {DashboardComponent} from '../../../../app/pages/dashboard/dashboard.component'
import { ContainerComponent } from './container/container.component';
import { ListOfContainerComponent } from './list-of-container/list-of-container.component';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { EditContainerComponent } from './edit-container/edit-container.component';
import { PortComponent } from './port/port.component';

const routes: Routes = [
  {path: 'dashboard', component: PagesComponent,
  canActivate:[AuthGuard],
  children: [
    {path: '', component: DashboardComponent,  data: {titulo: 'Purchase'}},
    {path: 'container', component: ContainerComponent, data: {titulo: 'Create Container'}},
    {path: 'list-of-container', component: ListOfContainerComponent, data: {titulo: 'List Container'}},
    {path: 'editontainer/:id', component: EditContainerComponent, data: {titulo: 'Edit Container'}},
    {path: 'port', component: PortComponent, data: {titulo: 'Port'}},
    // {path: 'product-new', component: ProductNewComponent, data: {titulo: 'Product'}},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
