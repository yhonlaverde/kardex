import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  DatabaseService} from '../../services/dataBase/database.service';
import { PostCodeService } from '../../services/dataBase/postCode.service';

import { CustomersComponent } from '../dataBase/customers/customers.component';
import { PostCodeComponent } from './postCode/postCode.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { StorageareaComponent } from './storage/storage-area/storage-area.component';
import { DistributionCenterComponent } from './distribution-center/distribution-center.component';
import { WineriesComponent } from './winerie/wineries/wineries.component';
import { CreateWineriesComponent } from './winerie/create-wineries/create-wineries.component';
import { SupplierComponent } from './suppliers/supplier/supplier.component';
import { CreateSupplierComponent } from './suppliers/create-supplier/create-supplier.component';
import { TranslateModule } from '@ngx-translate/core';
import { CountriesComponent } from './countries/countries.component';
import { FreightForwarderComponent } from './freight-forwarder/freight-forwarder.component';
import { CreateFreightForwarderComponent } from './freight/create-freight-forwarder/create-freight-forwarder.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { CityComponent } from './city/city.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CreateStorageAreaComponent } from './storage/create-storage-area/create-storage-area.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { SalesAreaComponent } from './sales-area/sales-area.component';


@NgModule({
  declarations: [
    CustomersComponent,
    PostCodeComponent,
    StorageareaComponent,
    DistributionCenterComponent,
    WineriesComponent,
    SupplierComponent,
    CountriesComponent,
    FreightForwarderComponent,
    CityComponent,
    CreateCustomerComponent,
    CreateWineriesComponent,
    CreateSupplierComponent,
    CreateStorageAreaComponent,
    CreateFreightForwarderComponent,
    SalesAreaComponent
    
  ],
  imports: [
    // ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ComponentsModule,
    TranslateModule,
    NgSelectModule,
    NgOptionHighlightModule,
    NgxPaginationModule,
    NgxMaterialTimepickerModule,
    NgxSpinnerModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    
  ],
  exports: [
    CustomersComponent,
    PostCodeComponent,
  ], 
  providers: [DatabaseService,PostCodeService]
})
export class DatabaseModule { }
