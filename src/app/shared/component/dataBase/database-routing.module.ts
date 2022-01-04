import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import {DashboardComponent} from '../../../pages/dashboard/dashboard.component'
import { PagesComponent } from 'src/app/pages/pages.component';
import { StorageareaComponent } from './storage/storage-area/storage-area.component';
import {AuthGuard} from '../../../auth/guards/auth.guard'
import { PostCodeComponent } from './postCode/postCode.component';
import { DistributionCenterComponent } from './distribution-center/distribution-center.component';
import { WineriesComponent } from './winerie/wineries/wineries.component';
import { CreateWineriesComponent } from './winerie/create-wineries/create-wineries.component';
import { SupplierComponent } from './suppliers/supplier/supplier.component';
import { CreateSupplierComponent } from './suppliers/create-supplier/create-supplier.component';
import { CountriesComponent } from './countries/countries.component';
import { FreightForwarderComponent } from './freight-forwarder/freight-forwarder.component';
import { CreateFreightForwarderComponent } from './freight/create-freight-forwarder/create-freight-forwarder.component';
import { CityComponent } from './city/city.component';
import { SalesAreaComponent } from './sales-area/sales-area.component';

import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CreateStorageAreaComponent } from './storage/create-storage-area/create-storage-area.component';

const routes: Routes = [
  {path: 'dashboard', component: PagesComponent,
  canActivate:[AuthGuard],
  children: [
    {path: '', component: DashboardComponent,  data: {titulo: 'DataBase'}},
    {path: 'customers', component: CustomersComponent, data: {titulo: 'Customers'}},
    {path: 'salesArea', component: SalesAreaComponent, data: {titulo: 'Sales Area'}},
    {path: 'Storagearea', component: StorageareaComponent, data: {titulo: 'Storage area'}},
    {path: 'postCode', component: PostCodeComponent, data: {titulo: 'PostCode'}},
    {path: 'country', component: CountriesComponent, data: {titulo: 'Countries'}},
    {path: 'freight' , component: FreightForwarderComponent, data: {titulo: 'Freight Forwarder'}},
    {path: 'createFreight/:id' , component: CreateFreightForwarderComponent, data: {titulo: 'Create Freight Forwarder'}},
    {path: 'distribution', component: DistributionCenterComponent, data: {titulo: 'Distribution Center'}},
    {path: 'warehouse', component: WineriesComponent, data: {titulo: 'Warehouse'}},
    {path: 'supplier', component: SupplierComponent, data: {titulo: 'Supplier'}},
    {path: 'city', component: CityComponent,data: {titulo: 'City'}},
    {path: 'createCustomer/:id', component: CreateCustomerComponent,data: {titulo: 'Create Customer'}},
    {path: 'createWineries/:id', component: CreateWineriesComponent,data: {titulo: 'Create Warehouse'}},
    {path: 'createSupplier/:id', component: CreateSupplierComponent,data: {titulo: 'Create Supplier'}},
    {path: 'createStorage/:id', component: CreateStorageAreaComponent,data: {titulo: 'Create Storage Area'}},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatabaseRoutingModule { }
