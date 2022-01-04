import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from '../../../pages/dashboard/dashboard.component'
import {AuthGuard} from '../../../auth/guards/auth.guard'
import { PagesComponent } from '../../../pages/pages.component';
import { ProductComponent } from './product/product.component';
import { MarkComponent } from './mark/mark.component';
import { ClassifationComponent } from './classifation/classifation.component';
import { UnitPackingComponent } from './unit-packing/unit-packing.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ProcessComponent } from './process/process.component';
import { OriginComponent } from './origin/origin.component';
import { VariedadComponent } from './variedad/variedad.component';
import { MotivoComponent } from './motivo/motivo.component';
import {InventoryListComponent} from './inventorys/inventory-list/inventory-list.component';
import { CrearReservaComponent } from './crear-reserva/crear-reserva.component';
import { ListaPrecioComponent } from './lista-precio/lista-precio.component';

 
const routes: Routes = [
  {path: 'dashboard', component: PagesComponent,
  canActivate:[AuthGuard],
  children: [
    {path: '', component: DashboardComponent,  data: {titulo: 'Inventary'}},
    {path: "articles/:id",component: ProductComponent,data: {titulo: 'Product'}},
    {path: "mark",component: MarkComponent,data: {titulo: 'Mark'}},
    {path: "classitation",component: ClassifationComponent,data: {titulo: 'Classification'}},
    {path: "ListPrecio",component: ListaPrecioComponent,data: {titulo: 'List Of Price'}},
    {path: "unit-packing",component: UnitPackingComponent,data: {titulo: 'Unit Packing'}},
    {path: "sub-category",component: SubCategoryComponent,data: {titulo: 'SubCategory'}},
    {path: "process",component: ProcessComponent,data: {titulo: 'Process'}},
    {path: "origin",component: OriginComponent,data: {titulo: 'Origin'}},
    {path: "variedad",component: VariedadComponent,data: {titulo: 'Varietal'}},
    {path: "reason",component: MotivoComponent,data: {titulo: 'Reason'}},
    {path: "inventory",component: InventoryListComponent,data: {titulo: 'Inventory List'}}
    
    
    
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
