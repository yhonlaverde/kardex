import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { displayedColumnsDetalleArticulo } from 'src/data/baseData/dataInventory/dataInventory';
import { ArticlesService } from '../../../services/articles/articles.service';


@Component({
  selector: 'app-base-bandeja-lista-grid',
  templateUrl: './base-bandeja-lista-grid.component.html',
  styleUrls: ['./base-bandeja-lista-grid.component.css']
})
export class BaseBandejaListaGridComponent implements OnInit {
  dataSource: any
  _columns = [];
  private IdbandejaSeleccionada: string;
  
  
  constructor(private activateRoute: ActivatedRoute, public inventario: ArticlesService) {
    this._columns = displayedColumnsDetalleArticulo;
   }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params) => {

      this.IdbandejaSeleccionada = params.get("idMenu")

    });

    this.initValue();
  }


  initValue() {
    this.inventario.getArticulosColumnas(this.IdbandejaSeleccionada.toString()).subscribe((res)=>{
      // this._columns = res.columns;
    })
  }

}
