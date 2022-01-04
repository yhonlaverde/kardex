import { Component, OnInit } from '@angular/core';
import { MaestrosService } from 'src/app/shared/services/articles/maestros.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-lista-precio',
  templateUrl: './lista-precio.component.html',
  styleUrls: ['./lista-precio.component.css']
})

export class ListaPrecioComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  parameterprice: any;
  listaPrecio: any;
  code: any;
  description: any;
  id: any;
  pagination: number = 1;
  searchArticulo:any;
searclist:any;
returnList:any;
mostrar:any;
articSearch:any;
itemsPages = 5;
  constructor(public maestros: MaestrosService,) {
    this.parameterprice ={
      idListaPrecio: 0,
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
    this.maestros.getListPrice(this.parameterprice,'GET').subscribe((clas)=>{
      console.log(clas);
      this.listaPrecio = clas.listaPrecios;
      this.searchArticulo = clas.listaPrecios;
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

  saveListPrice(){
    this.listaPrecio ={
      idListaPrecio: 0,
      descripcion: this.description.toString(),
      codigo: this.code,
    }

    this.maestros.getListPrice(this.listaPrecio,'INS').subscribe((marc)=>{
      Swal.fire(
        'Good job!',
        'success',
      )
      location.reload()
    });
  }

  EditListPrice(id){
    this.listaPrecio ={
      idListaPrecio: id,
      descripcion: this.description.toString(),
      codigo: this.code,
    }

    this.maestros.getListPrice(this.listaPrecio,'UPD').subscribe((marc)=>{
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
      this.listaPrecio;
      // this.MensajeAdvertenciaOut.emit('Debe digitar mas de 3 digitos.');
    }

  }

  searchIntoData(datos) {
    let searchTerm = datos;
    if (!searchTerm) {

    }
    if (searchTerm && searchTerm.trim() != "") {
      this.listaPrecio = this.searchArticulo.filter((item) => {

        return (
          item.codigo.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1 || (item.descripcion.toLowerCase().indexOf(searchTerm.toLowerCase()) >
            -1)
        )
      });

      if (this.listaPrecio.length == 0) {
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
    this.parameterprice ={
      idListaPrecio: datos.idListaPrecio,
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
        this.maestros.getListPrice(this.parameterprice, 'DEL').subscribe((marc) => {
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
    this.id = datos.idListaPrecio
    this.code = datos.codigo;
    this.description = datos.descripcion;
  }

  limpiar() {
    this.listaPrecio =  this.searchArticulo
    this.searclist = true;
    this.returnList = false;
    this.mostrar = false;
    this.articSearch = '';
  }
}

