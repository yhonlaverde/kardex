import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../../components/components.module';
import { ContainerComponent } from './container/container.component';
import { ListOfContainerComponent } from './list-of-container/list-of-container.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatExpansionModule} from '@angular/material/expansion';
import { EditContainerComponent } from './edit-container/edit-container.component';
import { PortComponent } from './port/port.component';




@NgModule({
  declarations: [
    ContainerComponent,
    ListOfContainerComponent,
    EditContainerComponent,
    PortComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ComponentsModule,
    NgxPaginationModule,
    TranslateModule,
    NgSelectModule,
    MatExpansionModule,
  
    
   
  ],
  exports:[
    ContainerComponent,
    ListOfContainerComponent,
    EditContainerComponent
  ]
})
export class PurchaseModule { }
