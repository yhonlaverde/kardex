import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {ComponentsModule} from '../../../../../src/app/components/components.module'
import { ProductComponent } from './product/product.component';
import { MaestrosService } from '../../services/articles/maestros.service';
import { ClassifationComponent } from './classifation/classifation.component';
import { MarkComponent } from './mark/mark.component';
import { UnitPackingComponent } from './unit-packing/unit-packing.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ProcessComponent } from './process/process.component';
import { OriginComponent  } from './origin/origin.component';
import { VariedadComponent } from './variedad/variedad.component';
import { MotivoComponent } from './motivo/motivo.component';
import { CrearReservaComponent } from './crear-reserva/crear-reserva.component';
import {InventoryListComponent} from './inventorys/inventory-list/inventory-list.component';
import {ListaPrecioComponent} from './lista-precio/lista-precio.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { NgxSpinnerModule } from "ngx-spinner";
import { GroupByPipe } from './inventorys/inventory-list/group-by.pipe';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
// import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    ProductComponent,
    ClassifationComponent,
    MarkComponent,
    UnitPackingComponent,
    SubCategoryComponent,
    ProcessComponent,
    OriginComponent,
    VariedadComponent,
    MotivoComponent,
    CrearReservaComponent,
    InventoryListComponent,
    ListaPrecioComponent,
    GroupByPipe
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ComponentsModule,
    TranslateModule,
    NgSelectModule,
    NgOptionHighlightModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    MatTableModule,
    MatExpansionModule,
    MatButtonModule
  ],
  exports: [
    ProductComponent,
    ClassifationComponent,
    MarkComponent,
    UnitPackingComponent,
    SubCategoryComponent,
    ProcessComponent,
    OriginComponent,
    VariedadComponent,
    MotivoComponent,
    CrearReservaComponent,
    InventoryListComponent,
    ListaPrecioComponent
      // CommonModule,
      // TranslateModule
  
  ],
  providers: [MaestrosService]
})
export class InventoryModule { }
