import { Component, OnInit } from '@angular/core';
import { MaestrosService } from 'src/app/shared/services/articles/maestros.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-unit-packing',
  templateUrl: './unit-packing.component.html',
  styleUrls: ['./unit-packing.component.css']
})
export class UnitPackingComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  parameterUnidad: any;
  unidad: any;
  pagination: number = 1;
  description: any
  status: any;
  id: any;
  code: any;
  weight: any;
  length: any;
  width: any;
  high: any;
  searchArticulo:any;
  searclist:any;
  returnList:any;
  mostrar:any;
  articSearch:any;
  itemsPages = 5;
  constructor(public maestros: MaestrosService,) {
    this.parameterUnidad = {
     idUnidadEmpaque: 0,
      descripcion:'',
      activo:'',
      peso: 0,
      largo: 0,
      ancho: 0,
      alto: 0,
      codigo : ''
    }
    this.action = [
      {
        description: "New",
        icon: "mdi mdi-plus-circle",
      },
    ];
  }

  ngOnInit(): void {
    this.maestros.getUnidadEmpaque(this.parameterUnidad, 'GET').subscribe((marc) => {
      this.unidad = marc.unidadesEmpaque;
      this.searchArticulo = marc.unidadesEmpaque;

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

  saveUnit() {
    this.parameterUnidad = {
      idUnidadEmpaque: 0,
      descripcion: this.description,
      activo: this.status,
      peso: this.weight,
      largo: this.length,
      ancho: this.width,
      alto: this.high,
      codigo: this.code
    }

    this.maestros.getUnidadEmpaque(this.parameterUnidad, 'INS').subscribe((marc) => {
      Swal.fire(
        'Good!',
        'Save Is Correct.',
        'success'
      )
      location.reload()
    });
  }

  EditUnit(id) {
    this.parameterUnidad = {
      idUnidadEmpaque: id,
      descripcion: this.description,
      activo: this.status,
      peso: this.weight,
      largo: this.length,
      ancho: this.width,
      alto: this.high,
      codigo: this.code
    }

    this.maestros.getUnidadEmpaque(this.parameterUnidad, 'UPD').subscribe((marc) => {
      Swal.fire(
        'Good!',
        'Update Is Correct.',
        'success'
      )
      location.reload()
    });
  }

  cancel(): void {
    this.description = ''
    this.status = ''
    this.weight = ''
    this.length = ''
    this.width = ''
    this.high = ''
    this.code = ''
  }
 
  borrar(datos) {
    this.parameterUnidad = {
      idUnidadEmpaque: datos.idUnidadEmpaque,
      descripcion: '',
      activo: ''
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
        this.maestros.getUnidadEmpaque(this.parameterUnidad, 'DEL').subscribe((marc) => {
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

    $('#edit').modal('show')
    this.id = datos.idUnidadEmpaque
    this.status = datos.activo;
    this.description = datos.descripcion;
    this.weight = datos.peso;
      this.length = datos.largo;
      this.width = datos.ancho;
      this.high = datos.alto;
      this.code = datos.codigo;
  }

  search(event) {
    if (event.target.value.length >= 3) {
      this.searchIntoData(event.target.value);
    } else {
      this.unidad;
      // this.MensajeAdvertenciaOut.emit('Debe digitar mas de 3 digitos.');
    }

  }

  searchIntoData(datos) {
    let searchTerm = datos;
    if (!searchTerm) {

    }
    if (searchTerm && searchTerm.trim() != "") {
      this.unidad = this.searchArticulo.filter((item) => {

        return (
          item.descripcion.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1 
        )
      });

      if (this.unidad.length == 0) {
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
    this.unidad =  this.searchArticulo
    this.searclist = true;
    this.returnList = false;
    this.mostrar = false;
    this.articSearch = '';
  }

}
