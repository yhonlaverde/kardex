import { Component, OnInit } from '@angular/core';
import { DocumentoService } from 'src/app/shared/services/articles/documento.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-motivo',
  templateUrl: './motivo.component.html',
  styleUrls: ['./motivo.component.css']
})
export class MotivoComponent<t, k> implements OnInit {


  action: IAction<t, k>[];
  subessearch: any;
  parameterSub: any;
  searchSub: any;
  subList: any;
  articSearch: any;
  id: any;
  code: any;
  descripcion: any;
  order: any;
  typeDocument: any;
  mostrar: boolean = false;
  pagination: number = 1;
  searclist:any;
  searchArticulo: any
returnList:any;
itemsPages = 5;
  constructor(public maestros: DocumentoService,) {
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
      idMotivo: 0,
      codigo: "",
      descripcion: "",
      orden: 0,
      idTipoDocumento: 0
    }
  }

  initvalue(): void {

    this.maestros.getMotivo(this.parameterSub, 'GET').subscribe((sub) => {
      this.subessearch = sub.motivos;
      this.searchArticulo = sub.motivos;

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
      idMotivo: 0,
      codigo: this.code,
      descripcion: this.descripcion,
      orden: this.order,
      idTipoDocumento: parseInt(this.typeDocument)
    }

    this.maestros.getMotivo(this.parameterSub, 'INS').subscribe((marc) => {

      $('#staticBackdrop').modal('hide')
      Swal.fire(
        'Good job!',
        'success',
      )
      location.reload()

    });
  }

  cancel(): void {
    this.code = ''
    this.descripcion = ''
    this.order = ''
    this.typeDocument = ''
  }
 
  EditSub(id): void {
    this.parameterSub = {
      idMotivo: this.id,
      codigo: this.code,
      descripcion: this.descripcion,
      orden: this.order,
      idTipoDocumento: parseInt(this.typeDocument)
    }

    this.maestros.getMotivo(this.parameterSub, 'UPD').subscribe((marc) => {
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
      this.subessearch;
      // this.MensajeAdvertenciaOut.emit('Debe digitar mas de 3 digitos.');
    }

  }

  searchIntoData(datos) {
    let searchTerm = datos;
    if (!searchTerm) {

    }
    if (searchTerm && searchTerm.trim() != "") {
      this.subessearch = this.searchArticulo.filter((item) => {

        return (
          item.codigo.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1 || (item.descripcion.toLowerCase().indexOf(searchTerm.toLowerCase()) >
            -1)
        )
      });

      if (this.subessearch.length == 0) {
        this.mostrar = true;
        this.searclist = false;
        this.returnList = true;
      } else {
        this.mostrar = false;
        this.searclist = false;
        this.returnList = true;
      }


      this.articSearch = "";
    }
  }

  limpiar() {
    this.subessearch =  this.searchArticulo
    this.searclist = true;
    this.returnList = false;
    this.mostrar = false;
    this.articSearch = '';
  }

  editar(datos) {
    $('#editMark').modal('show')
    this.id = datos.idMotivo;
    this.code = datos.codigo;
    this.descripcion = datos.descripcion;
    this.order = datos.orden;
    this.typeDocument = datos.idTipoDocumento;
  }

}
