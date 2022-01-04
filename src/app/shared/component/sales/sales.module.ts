import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { ReturnOrderComponent } from './return-order/return-order.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateTrasnferComponent } from './create-trasnfer/create-trasnfer.component';
import { CreateOutboundComponent } from './create-outbound/create-outbound.component';


@NgModule({
  declarations: [
    SalesOrderComponent, 
    ReturnOrderComponent, 
    ListOrdersComponent, 
    CreateTrasnferComponent, CreateOutboundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ComponentsModule
  ],
  exports: [
    SalesOrderComponent,
    ListOrdersComponent,
  ]
})
export class SalesModule { }
