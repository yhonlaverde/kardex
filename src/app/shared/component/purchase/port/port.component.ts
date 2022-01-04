import { Component, OnInit } from '@angular/core';
import { DocumentoService } from 'src/app/shared/services/articles/documento.service';
import { MaestrosService } from 'src/app/shared/services/articles/maestros.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-port',
  templateUrl: './port.component.html',
  styleUrls: ['./port.component.css']
})
export class PortComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  parameterPuerto: any;
  unidad: any;
  pagination: number = 1;
  description: any
  status: any;
  id: any;
  code: any;
  typePort: any;
  searchArticulo:any;
  searclist:any;
  returnList:any;
  mostrar:any;
  articSearch:any;
  itemsPages = 5;
  constructor( public docm: DocumentoService,) {
    this.parameterPuerto = {
      idPuerto: 0,
      codigo: '',
      descripcion: '',
      tipo: ''
    }
    this.action = [
      {
        description: "New",
        icon: "mdi mdi-plus-circle",
      },
    ];
  }

  ngOnInit(): void {


    this.docm.getPuerto(this.parameterPuerto, 'GET').subscribe((marc) => {
      this.unidad = marc.puertos;
      this.searchArticulo = marc.puertos;

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

  savePort() {
    this.parameterPuerto = {
      idPuerto: 0,
  codigo: this.code,
  descripcion: this.description,
  tipo: this.typePort
    }

    this.docm.getPuerto(this.parameterPuerto, 'INS').subscribe((marc) => {
      Swal.fire({
        title: 'Save Correct!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: 'rgb(35 80 105)',
        cancelButtonColor: '#a5dc86',
        confirmButtonText: 'Back To List!',
        cancelButtonText:'Ok',
        denyButtonText: `Ok`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          location.reload()
        } else if (result.isDenied) {
         
        }
      })
    });
  }

  EditPort(id) {
    this.parameterPuerto = {
      idPuerto: id,
      codigo: this.code,
  descripcion: this.description,
  tipo: this.typePort
    }

    this.docm.getPuerto(this.parameterPuerto, 'UPD').subscribe((marc) => {
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
    this.code = ''
    this.typePort = ''
  }
 
  borrar(datos) {
    this.parameterPuerto = {
      idPuerto: datos.idPuerto,
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
        this.docm.getPuerto(this.parameterPuerto, 'DEL').subscribe((marc) => {
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
    this.id = datos.idPuerto
    this.status = datos.activo;
    this.description = datos.descripcion;
    this.code = datos.codigo;
    this.typePort = datos.tipo
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
