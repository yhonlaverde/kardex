import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from 'src/app/shared/services/articles/articles.service';
import { IAction } from 'src/data/modelos/controles/IAction';
declare var $: any;
@Component({
  selector: 'app-list-of-container',
  templateUrl: './list-of-container.component.html',
  styleUrls: ['./list-of-container.component.scss']
})
export class ListOfContainerComponent <t, k>implements OnInit {
  action: IAction<t, k>[];
  pagination: number = 1;
  itemsPages: number = 5;
  returnList: boolean = false;
  parameterSearch;
  listOrden;
 
  listInventory;
  constructor(private router: Router,public inventario: ArticlesService,) {
    this.action = [
      {
        description: "New",
        icon: "mdi mdi-content-save",
      },
     
    ];
   }

  ngOnInit(): void {
    this.parameterSearch = {
      idBandeja: "25",
      busqueda: "",
      idUsuario: 61
    }

    this.inventario.searchArticles(this.parameterSearch).subscribe((res) => {
      this.listOrden =  res.data;
      console.log(res.data)
      this.validarItems(res.data)
      // this.listInventory = ;
    });
  }

  validarItems( inven){
    this.listInventory = [];
    for (const i of Object["values"](inven)) {
      i["ConfinetContainer"] = `${i["Contenedor Cofinet"]}`;
      i["ArrivalPort"] = `${i["Retenciones Frontera"]}`;
      i["DepartureDate"] = `${i["Fecha Salida"]}`;
      i["ArrivalDate"] = `${i["Fecha Llegada"]}`;
      i["BorderHold"] = `${i["Peso Bruto"]}`;
      this.listInventory.push(i);
    }
    this.listInventory.reverse()
  }

  editar(idDoc){
    this.router.navigate(['dashboard/editontainer', idDoc.IdOrdenCompra], { skipLocationChange: true });
  }

  actionExecuted($event): void {
    switch ($event.description) {

      case "New":
        this.router.navigate(['dashboard/container'], { skipLocationChange: true });
        break;
      case "Filter":
        this.filterModal();
        // this.router.navigate(['dashboard/list-orders'], { skipLocationChange: true });
        break;
    }
  }

  filterModal(): void{
    $('#exampleModal').modal('show')
  }

}
