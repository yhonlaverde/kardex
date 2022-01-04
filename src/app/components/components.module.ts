import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { ActionButtonComponent } from './actionbutton/actionbutton.component';
import { DonaComponent } from './dona/dona.component';
import { FormsModule } from '@angular/forms';
import { DinamicFormComponent } from './dinamicForm/dinamicForm.component';
import {  ReactiveFormsModule} from '@angular/forms';
import { GridTableBaseComponent } from './grid-table-base/grid-table-base.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoadinSpinnerComponent } from './loadin-spinner/loadin-spinner.component';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [ActionButtonComponent, DinamicFormComponent,DonaComponent, GridTableBaseComponent, LoadinSpinnerComponent],
  exports: [
    ActionButtonComponent,
    DinamicFormComponent,
    DonaComponent,
    GridTableBaseComponent,
    LoadinSpinnerComponent
  ],
    
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    TranslateModule,
    //se usa para controlar el error de NGMODEL en un formulario. error warning de la consola
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    NgxPaginationModule
  ]
})
export class ComponentsModule { }
