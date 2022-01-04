import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/dataBase/database.service';
import { PostCodeService } from 'src/app/shared/services/dataBase/postCode.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import * as moment from 'moment';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
declare var $: any;
@Component({

  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  parameterCiudad: any;
  parameterSupplier: any;
  parameterPais: any;
  clientListSearch: any;
  clientList: any;
  mostrar: boolean = false;
  articSearch: any;
  searchCustomer: any;
  cities: any;
  code: any;
  identificacion: any;
  name: any;
  address: any;
  contact: any;
  phone: any;
  email: any;
  city: any;
  estado: any;
  observation: any;
  id: any;
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
  pagination: number = 1;
  parameterPostCode: any;
  posCodeList: any;
  nameCiudad: any;
  postCodelist: any;
  emailOp: any;
  emailFin: any;
  idpais: any;
  postcodLISTA: any;
  poListCod: any
  open: boolean = false
  selectPost: boolean = true;
  citieslist: any;
  postLISTA: any;
  postCodestr: any;
  codigoPostalBuffer = [];
  ciudad: any;
  horaActual: any;
  loading = false;
  photosBuffer = [];
  bufferSize = 50;
  numberOfItemsFromEndBeforeFetchingMore = 10;
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
    // this._PosService.getCodigoPostal(this.parameterPostCode, 'GET')
    // this.getConfiguration();
    this.initvalue();
    this.horaActual = moment().format()
  }

  initParameter() {
   
    this.action = [
      {
        description: "New",
        icon: "mdi mdi-plus-circle",
      },
    ];

    this.parameterSupplier = {
      idProveedor: 0,
      codigo: '',
      identificacion: '',
      nombre: '',
      direccion: '',
      telefono: '',
      contacto: '',
      correo: '',
      observaciones: '',
      idCiudad: 0,
      idUsuarioModificacion: 61,
      fechaModificacion: "2021-10-26T15:44:53.482Z",
      estado: '',
      idPais: 0,
      direccion2: '',
      codigoPostal: '',
      correoFin: ''
    }
  }

  initvalue(): void {

    this.maestros.getProveedor(this.parameterSupplier, 'GET').subscribe((client) => {
      this.clientListSearch = client.proveedores;
      this.clientListSearch.reverse()
      this.searchCustomer = client.proveedores
    })
  }

  actionExecuted(event): void {
    switch (event.description) {
      case "folder_open":
        // this.abrirArticulo(paramevents.id);
        break;

      case "New":
        this.newSupplier();
        break;

      default:
        throw new Error(`No existe la acción ${event.action} en la bandeja`);
    }
  }

  newSupplier(){
    this.router.navigate(['dashboard/createSupplier', 0], { skipLocationChange: true });
  }

  editarSupplier(id){
    this.router.navigate(['dashboard/createSupplier', id], { skipLocationChange: true });
  }

 

  search(event) {
    if (event.target.value.length >= 3) {
      this.searchIntoData(event.target.value);
    } else {
      this.clientListSearch;
      // this.MensajeAdvertenciaOut.emit('Debe digitar mas de 3 digitos.');
    }
  }

  searchIntoData(datos) {
    // this.searchCustomer = this.clientListSearch;
    let searchTerm = datos;
    if (!searchTerm) {

    }
    if (searchTerm && searchTerm.trim() != "") {
      this.clientListSearch = this.searchCustomer.filter((item) => {

        return (
          item.codigo.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1 || (item.identificacion.toLowerCase().indexOf(searchTerm.toLowerCase()) >
            -1) || (item.nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) >
              -1) || (item.telefono.toLowerCase().indexOf(searchTerm.toLowerCase()) >
                -1) || (item.contacto.toLowerCase().indexOf(searchTerm.toLowerCase()) >
                  -1)
        )
      });

      if (this.clientListSearch.length == 0) {
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
    this.clientListSearch = this.searchCustomer;
    this.searclist = true;
    this.returnList = false;
    this.mostrar = false;
  }

  borrar(datos) {
    this.parameterSupplier = {
      idProveedor: datos.idProveedor,
      codigo: datos.codigo,
      identificacion: datos.identificacion,
      nombre: datos.nombre,
      direccion: datos.direccion,
      telefono: datos.telefono,
      contacto: datos.contacto,
      observaciones: datos.observaciones,
      idCiudad: datos.idCiudad,
      correo: datos.correo,
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
        this.maestros.getProveedor(this.parameterSupplier, 'DEL').subscribe((marc) => {
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
