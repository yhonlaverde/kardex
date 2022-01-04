import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { BaseBandejaComponent } from './base-bandeja/base-bandeja.component';
import { BaseBandejaListaGridComponent } from './base-bandeja-lista-grid/base-bandeja-lista-grid.component';
import { ArticlesService } from '../../services/articles/articles.service';


@NgModule({
  declarations: [
    BaseBandejaComponent,
    BaseBandejaListaGridComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ComponentsModule
  ],
  exports: [
    BaseBandejaComponent,
    BaseBandejaListaGridComponent,
  ],
  providers: [ArticlesService]

})
export class  BandejasModule { }
