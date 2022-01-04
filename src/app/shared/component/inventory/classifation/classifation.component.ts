import { Component, OnInit } from '@angular/core';
import { MaestrosService } from 'src/app/shared/services/articles/maestros.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-classifation',
  templateUrl: './classifation.component.html',
  styleUrls: ['./classifation.component.css']
})
export class ClassifationComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  parameterClasificacion: any;
  Clasificacion: any;
  code: any;
  description: any;
  id: any;
  pagination: number = 1;

  searchArticulo:any;
searclist:any;
returnList:any;
mostrar:any;
itemsPages = 5;
articSearch:any;
  constructor(public maestros: MaestrosService,) {
    this.parameterClasificacion ={
      idClasificacion: 0,
      descripcion: '',
      codigo: ''
    }
    this.action = [
      {
        description: "New",
        icon: "mdi mdi-plus-circle",
      },
    ];
   }

  ngOnInit(): void {
    this.maestros.getClasificacion(this.parameterClasificacion,'GET').subscribe((clas)=>{
      this.Clasificacion = clas.clasificaciones;
      this.searchArticulo = clas.clasificaciones;
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

  cancel(): void {
       this.description = ''
       this.code = ''
  }


  crearUnidad(): void {
    $('#staticBackdrop').modal('show')
  }

  saveClassication(){
    this.Clasificacion ={
      idClasificacion: 0,
      descripcion: this.description,
      codigo: this.code,
    }

    this.maestros.getClasificacion(this.Clasificacion,'INS').subscribe((marc)=>{
      Swal.fire(
        'Good job!',
        'success',
      )
      location.reload()
    });
  }

  EditClassication(id){
    this.Clasificacion ={
      idClasificacion: id,
      descripcion: this.description,
      codigo: this.code,
    }

    this.maestros.getClasificacion(this.Clasificacion,'UPD').subscribe((marc)=>{
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
      this.Clasificacion;
      // this.MensajeAdvertenciaOut.emit('Debe digitar mas de 3 digitos.');
    }

  }

  searchIntoData(datos) {
    let searchTerm = datos;
    if (!searchTerm) {

    }
    if (searchTerm && searchTerm.trim() != "") {
      this.Clasificacion = this.searchArticulo.filter((item) => {

        return (
          item.codigo.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1 || (item.descripcion.toLowerCase().indexOf(searchTerm.toLowerCase()) >
            -1)
        )
      });

      if (this.Clasificacion.length == 0) {
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

  borrar(datos) {
    this.parameterClasificacion ={
      idClasificacion: datos.idClasificacion,
      descripcion: datos.descripcion,
      codigo: datos.codigo
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
        this.maestros.getClasificacion(this.parameterClasificacion, 'DEL').subscribe((marc) => {
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

  editar(datos){
    
    $('#edit').modal('show')
    this.id = datos.idClasificacion
    this.code = datos.codigo;
    this.description = datos.descripcion;
  }

  limpiar() {
    this.Clasificacion =  this.searchArticulo
    this.searclist = true;
    this.returnList = false;
    this.mostrar = false;
    this.articSearch = '';
  }
}
