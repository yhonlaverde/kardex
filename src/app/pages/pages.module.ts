import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {SharedModule} from '../shared/shared.module'
import { ComponentsModule } from '../components/components.module';
import {RouterModule} from '@angular/router';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { ListOfReservationComponent} from './list-of-reservation/list-of-reservation.component';
import {TranslateModule} from '@ngx-translate/core';
import { DocumentoService} from '../shared/services/articles/documento.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditarReservationComponent } from './editar-reservation/editar-reservation.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    CreateReservationComponent,
    ListOfReservationComponent,
    EditarReservationComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    TranslateModule,
    NgxPaginationModule,
    NgSelectModule,
    NgOptionHighlightModule,
    
  ],
  providers: [
    DocumentoService
  ]

})
export class PagesModule { }
