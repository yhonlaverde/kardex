import { Component, OnInit } from '@angular/core';
import { MaestrosService } from 'src/app/shared/services/articles/maestros.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  subessearch: any;
  parameterSub: any;
  searchSub: any;
  subList:any;
  articSearch:any;
  id : any;
  code: any;
  descripcion: any;
  mostrar: boolean = false;
  constructor(public maestros: MaestrosService,) {
    this.initParameter();
   }

  ngOnInit(): void {
    this.initvalue();
  }

  initParameter() {
    this.action = [
      {
        description: "New",
        icon: "mdi mdi-plus-circle",
      },
    ];

    this.parameterSub = {
      idSubCategoria: 0,
      codigo: "",
      descripcion: ""
    }
  }

  initvalue(): void {

    this.maestros.getSubCategory(this.parameterSub, 'GET').subscribe((sub) => {
      
      this.subessearch = sub.subCategorias;

    });


  }

  actionExecuted(event): void {
    switch (event.description) {
      case "folder_open":
        // this.abrirArticulo(paramevents.id);
        break;

      case "New":
        this.crearUnidad();
        break;

      default:
        throw new Error(`No existe la acción ${event.action} en la bandeja`);
    }

  }

  crearUnidad(): void {
    $('#staticBackdrop').modal('show')
  }

  SaveSub(): void {
    this.parameterSub = {
      idSubCategoria: 0,
      codigo: this.code,
      descripcion: this.descripcion
    }

    this.maestros.getSubCategory(this.parameterSub, 'INS').subscribe((marc) => {
     
      $('#staticBackdrop').modal('hide')
      Swal.fire(
        'Good job!',
        'success',
      )
       location.reload()

    });
  }

  EditSub(id): void {
    this.parameterSub = {
      idSubCategoria: this.id,
      codigo: this.code,
      descripcion: this.descripcion
    }

    this.maestros.getSubCategory(this.parameterSub, 'UPD').subscribe((marc) => {
      $('#editMark').modal('hide')
      Swal.fire(
        'Good job!',
        'success',
      )
       location.reload()

    });
  }

  search(event) {
    if (event.target.value.length >= 3) {
      this.searchIntoData(event.target.value);
    } else {
      this.articSearch;
      // this.MensajeAdvertenciaOut.emit('Debe digitar mas de 3 digitos.');
    }

  }

  searchIntoData(datos) {
    this.searchSub = this.subessearch;
    let searchTerm = datos;
    if (!searchTerm) {

    }
    if (searchTerm && searchTerm.trim() != "") {
      this.subList = this.searchSub.filter((item) => {
        return (
          // item.contacto.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          // -1,
          item.descripcion.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1
        );
      });
      if (this.subList.length == 0) {
        this.mostrar = true;
      } else {
        this.mostrar = false;
      }
      this.articSearch = "";
    }
  }

  editar(datos) {
    $('#editMark').modal('show')
    this.id = datos.idSubCategoria;
    this.code = datos.codigo;
    this.descripcion = datos.descripcion;
  }
  
}
