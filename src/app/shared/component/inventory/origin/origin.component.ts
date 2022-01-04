import { Component, OnInit } from '@angular/core';
import { MaestrosService } from 'src/app/shared/services/articles/maestros.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.css']
})
export class OriginComponent<t, k> implements OnInit {

  action: IAction<t, k>[];
  subessearch: any;
  parameterSub: any;
  searchSub: any;
  subList:any;
  articSearch:any;
  id : any;
  code: any;
  mostrar: boolean = false;
  descripcion: any;
  pagination: number = 1;

  searchArticulo:any;
  searclist:any;
  returnList:any;
  itemsPages = 5;
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
      idOrigenItem: 0,
      codigo: "",
      descripcion: ""
    }
  }

  initvalue(): void {

    this.maestros.getOrigin(this.parameterSub, 'GET').subscribe((sub) => {
      this.subessearch = sub.origenesItem;
      this.searchArticulo = sub.origenesItem;

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
      idOrigenItem: 0,
      codigo: this.code,
      descripcion: this.descripcion
    }

    this.maestros.getOrigin(this.parameterSub, 'INS').subscribe((marc) => {
     
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
      idOrigenItem: this.id,
      codigo: this.code,
      descripcion: this.descripcion
    }

    this.maestros.getOrigin(this.parameterSub, 'UPD').subscribe((marc) => {
      $('#editMark').modal('hide')
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

  borrar(datos) {
    this.parameterSub = {
      idOrigenItem: datos.idOrigenItem,
      codigo: datos.codigo,
      descripcion: datos.descripcion
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.maestros.getOrigin(this.parameterSub, 'DEL').subscribe((marc) => {
          if (marc.mensaje.msgId == -1) {
            Swal.fire(
              'Not Deleted!',
              'The data cannot be deleted because it is associated with other records. ',
              'info'
            )
          } else {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            location.reload()
          }
          //
        });
      }
    })
  }

  editar(datos) {
    $('#editMark').modal('show')
    this.id = datos.idOrigenItem;
    this.code = datos.codigo;
    this.descripcion = datos.descripcion;
  }

}
