import { Component, OnInit } from '@angular/core';
import { MaestrosService } from 'src/app/shared/services/articles/maestros.service';
import { DatabaseService } from 'src/app/shared/services/dataBase/database.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-sales-area',
  templateUrl: './sales-area.component.html',
  styleUrls: ['./sales-area.component.css']
})


export class SalesAreaComponent<t, k> implements OnInit {

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
  constructor(public maestros: DatabaseService,) {
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
      idAreaVenta: 0,
      codigo: "",
      descripcion: ""
    }
  }

  initvalue(): void {

    this.maestros.getareaVenta(this.parameterSub, 'GET').subscribe((sub) => {
      this.subessearch = sub.areasVenta;
      this.searchArticulo  = sub.areasVenta;

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
      idAreaVenta: 0,
      codigo: this.code,
      descripcion: this.descripcion
    }

    this.maestros.getareaVenta(this.parameterSub, 'INS').subscribe((marc) => {
  
      
      Swal.fire({
        title: 'Save Correct!',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Back To List',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          $('#staticBackdrop').modal('hide')
          location.reload()
        } else if (result.isDenied) {

        }
      })
    //   location.reload()

    });
  }

  cancel(): void {
    this.code = ''
    this.descripcion = ''
  }


  EditSub(id): void {
    this.parameterSub = {
      idAreaVenta: this.id,
      codigo: this.code,
      descripcion: this.descripcion
    }

    this.maestros.getareaVenta(this.parameterSub, 'UPD').subscribe((marc) => {
     
      Swal.fire({
        title: 'Update Correct!',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Back To List',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          $('#editMark').modal('hide')
          location.reload()
        } else if (result.isDenied) {

        }
      })

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

  
  borrar(datos) {
    this.parameterSub = {
      idAreaVenta: datos.idAreaVenta,
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
        this.maestros.getareaVenta(this.parameterSub, 'DEL').subscribe((marc) => {
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
    this.id = datos.idAreaVenta;
    this.code = datos.codigo;
    this.descripcion = datos.descripcion;
  }

}