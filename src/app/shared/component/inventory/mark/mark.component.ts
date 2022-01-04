import { Component, OnInit } from '@angular/core';
import { MaestrosService } from 'src/app/shared/services/articles/maestros.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css']
})
export class MarkComponent <t, k>implements OnInit {
  action: IAction<t, k>[];
  parameterMarca: any;
  Marca: any; 
  code:any;
  description:any;
  pagination: number = 1;
  id: any;
  searchArticulo:any;
searclist:any;
returnList:any;
mostrar:any;
articSearch:any;
itemsPages = 5;
  constructor(public maestros: MaestrosService,) {

    
    this.parameterMarca ={
      idMarca: 0,
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
    this.maestros.getMarca(this.parameterMarca,'GET').subscribe((marc)=>{
      this.Marca = marc.marcas;
      this.searchArticulo = marc.marcas;

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

  SaveMark(){
    this.parameterMarca ={
      idMarca: 0,
      descripcion: this.description,
      codigo: this.code,
    }

    this.maestros.getMarca(this.parameterMarca,'INS').subscribe((marc)=>{
      Swal.fire(
        'Good job!',
        'success',
      )
      location.reload()
    });
  }

  EditMark(id){
    this.parameterMarca ={
      idMarca: id,
      descripcion: this.description,
      codigo: this.code,
    }

    this.maestros.getMarca(this.parameterMarca,'UPD').subscribe((marc)=>{
      Swal.fire(
        'Good job!',
        'success',
      )
      location.reload()
    });
  }
  cancel(): void {
    this.description = ''
   this.code = ''
  }


  borrar(datos) {
    this.parameterMarca ={
      idMarca: datos.idMarca,
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
        this.maestros.getMarca(this.parameterMarca, 'DEL').subscribe((marc) => {
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
    $('#editMark').modal('show')
    this.id = datos.idMarca
    this.code = datos.codigo;
    this.description = datos.descripcion;
  }

  search(event) {
    if (event.target.value.length >= 3) {
      this.searchIntoData(event.target.value);
    } else {
      this.Marca;
      // this.MensajeAdvertenciaOut.emit('Debe digitar mas de 3 digitos.');
    }

  }

  searchIntoData(datos) {
    let searchTerm = datos;
    if (!searchTerm) {

    }
    if (searchTerm && searchTerm.trim() != "") {
      this.Marca = this.searchArticulo.filter((item) => {

        return (
          item.codigo.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1 || (item.descripcion.toLowerCase().indexOf(searchTerm.toLowerCase()) >
            -1)
        )
      });

      if (this.Marca.length == 0) {
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
    this.Marca =  this.searchArticulo
    this.searclist = true;
    this.returnList = false;
    this.mostrar = false;
    this.articSearch = '';
  }

}
