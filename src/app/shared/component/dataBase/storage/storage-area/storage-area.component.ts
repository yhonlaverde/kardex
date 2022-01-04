import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/shared/services/dataBase/database.service';
import { PostCodeService } from 'src/app/shared/services/dataBase/postCode.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-storage-area',
  templateUrl: './storage-area.component.html',
  styleUrls: ['./storage-area.component.scss']
})
export class StorageareaComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  parameterWineries: any;
  parameterAlmacen: any;
  parameterCiudad: any;
  parameterPostCode: any;
  almacenListSearch: any;
  almacenList: any;
  searchAlmacen: any[];
  articSearch: any;
  bodegas: any;
  bodegasList: any;
  posCodeList: any
  cities: any;
  code: any;
  description: any;
  contact: any;
  phone: any;
  userMail: any;
  userOperator: any;
  winierie: any;
  city: any;
  estado: any;
  observation: any;
  id: any;
  mostrar: boolean = false;
  nameCiudad: any;
  inputSearc: boolean = true;
  selecOpcion: boolean = false;
  searclist: boolean = true;
  returnList: boolean = false;
  calleuno: any;
  calledos: any;
  state: any;
  postCode: any;
  country: any;
  countryName: any;
  paises: any;
  parameterPais: any;
  pagination: number = 1;
  postCodelist: any;
  postcodLISTA: any;
  poListCod: any
  selectPost: boolean = true;
  citieslist: any;
  postLISTA: any;
  open: boolean = false
  postCodestr: any;
  ciudad: any;
  loading = false;
  codigoPostalBuffer = [];
  bufferSize = 50;
  numberOfItemsFromEndBeforeFetchingMore = 10;

  suburb: any;
  mostrarSelect: boolean;
  mostrarcodigo: boolean = false;
  itemsPages: number = 5;
  constructor(public maestros: DatabaseService, public _PosService: PostCodeService, private router: Router,) {
    this.parameterPostCode = {
      idCodigoPostal: 0,
      codigo: "",
      descripcion: "",
      idCiudad: 0,
    }

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

    this.parameterAlmacen = {
      idAlmacen: 0,
      codigo: "",
      descripcion: "",
      observaciones: "",
      contacto: "",
      telefono: "",
      idBodega: 0,
      correoUsuario: "",
      correoOperador: "",
      idCiudad: 0,
      idUsuarioModificacion: 0,
      fechaModificacion: "2021-09-30T12:46:39.127Z",
      estado: "",
      codigoPostal: ""
    }


    this.parameterPostCode = {
      idCodigoPostal: 0,
      codigo: "",
      descripcion: "",
      idCiudad: 0,
    }
  }

  initvalue(): void {

    this.maestros.getAlmacen(this.parameterAlmacen, 'GET').subscribe((alma) => {
      this.almacenListSearch = alma.almacenes;
      this.almacenListSearch.reverse()
      this.searchAlmacen = alma.almacenes;
    });
  }

  onKey(value: any) {
    this.open = true
  }

  actionExecuted(event): void {
    switch (event.description) {
      case "folder_open":
        // this.abrirArticulo(paramevents.id);
        break;

      case "New":
        this.newStorage();
        break;

      default:
        throw new Error(`No existe la acción ${event.action} en la bandeja`);
    }

  }
  newStorage(){
    this.router.navigate(['dashboard/createStorage', 0], { skipLocationChange: true });
  }

  editar(id){
    this.router.navigate(['dashboard/createStorage', id], { skipLocationChange: true });
  }

  search(event) {
    if (event.target.value.length >= 3) {
      this.searchIntoData(event.target.value);
    } else {
      this.almacenListSearch;
      // this.MensajeAdvertenciaOut.emit('Debe digitar mas de 3 digitos.');
    }

  }

  volverAbuscar() {
    this.inputSearc = true
    this.selecOpcion = false;
    this.selectPost = true;
    this.nameCiudad = "";

    this.state = "";
    this.poListCod = [];
    this.countryName = "";
  }


  searchIntoData(datos) {
    //  this.searchAlmacen = this.almacenListSearch;
    let searchTerm = datos;
    if (!searchTerm) {

    }
    if (searchTerm && searchTerm.trim() != "") {
      this.almacenListSearch = this.searchAlmacen.filter((item) => {

        return (
          item.codigo.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1 || (item.contacto.toLowerCase().indexOf(searchTerm.toLowerCase()) >
            -1) || (item.descripcion.toLowerCase().indexOf(searchTerm.toLowerCase()) >
              -1) || (item.correoUsuario.toLowerCase().indexOf(searchTerm.toLowerCase()) >
                -1) || (item.correoOperador.toLowerCase().indexOf(searchTerm.toLowerCase()) >
                  -1)
        )
      });

      if (this.almacenListSearch.length == 0) {
        this.mostrar = true;
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
    this.almacenListSearch = this.searchAlmacen;
    this.searclist = true;
    this.returnList = false;
    this.mostrar = false;
  }



  borrar(datos) {
    this.parameterAlmacen = {
      idAlmacen: datos.idAlmacen,
      codigo: datos.codigo,
      descripcion: datos.descripcion,
      observaciones: datos.observaciones,
      contacto: datos.contacto,
      telefono: datos.telefono,
      idBodega: datos.idBodega,
      correoUsuario: datos.correoUsuario,
      correoOperador: datos.correoOperador,
      idCiudad: datos.idCiudad,
      idUsuarioModificacion: 61,
      fechaModificacion: datos.fechaModificacion,
      estado: datos.estado,
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
        this.maestros.getAlmacen(this.parameterAlmacen, 'DEL').subscribe((marc) => {
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


}
