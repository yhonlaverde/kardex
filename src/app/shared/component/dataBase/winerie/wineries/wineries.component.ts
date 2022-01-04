import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/dataBase/database.service';
import { PostCodeService } from 'src/app/shared/services/dataBase/postCode.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-wineries',
  templateUrl: './wineries.component.html',
  styleUrls: ['./wineries.component.css']
})
export class WineriesComponent<t, k> implements OnInit {
 
  action: IAction<t, k>[];
  parameterWineries: any;
  parameterDistribucion: any;
  parameterCiudad: any;
  parameterPostCode: any;
  parameterPais: any;
  distribucionList: any;
  searchArticulo: any[];
  articSearch: any;
  bodegas: any;
  bodegasList: any;
  mostrar: boolean = false;
  code: any;
  description: any;
  contact: any;
  phone: any;
  distribuc: any;
  estado: any;
  observation: any;
  id: any;
  city: any;
  cities: any;
  inputSearc: boolean = true;
  selecOpcion: boolean = false;
  searclist: boolean = true;
  returnList: boolean = false;
  selecOpcion1: boolean = false;
  inputSearc1: boolean = true;
  paises: any;
  state: any;
  postCode: any;
  contac: any;
  country: any;
  countryName: any;
  calleuno: any;
  calledos: any;
  email1: any;
  email2: any;
  openTime: any;
  closeTime: any;
  pagination: number = 1;
  statusWineries: any;
  nameCiudad: any;
  posCodeList: any;
  postCodelist: any;
  postcodLISTA: any;
  values = '';
  poListCod: any
  selectPost: boolean = true;
  mostrarPost: boolean;
  mostrarCiudad: boolean;
  citieslist: any;
  postLISTA: any;
  ciudad = "Enter City";
  open: boolean = false
  open1: boolean = false
  postCodestr: any;
  loading = false;
  codigoPostalBuffer = [];
  bufferSize = 50;
  horaActual:any;
  numberOfItemsFromEndBeforeFetchingMore = 10;
  descriptionValidar: boolean = false;
  itemsPages: number = 5;
  constructor(public maestros: DatabaseService, public _PosService: PostCodeService, private router: Router,
    private activatedRoute: ActivatedRoute,) {


  }

  ngOnInit(): void {
    this.initParameter();
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
    this.parameterWineries = {
      idBodega: 0,
      codigo: "",
      descripcion: "",
      observaciones: "",
      contacto: "",
      telefono: "",
      idCentroDistribucion: 0,
      idUsuarioModificacion: 0,
      fechaModificacion: this.horaActual,
      estado: "",
      idCiudad: 0,
      codigoPostal: "",
      direccion: "",
      direccion2: "",
      horaApertura: "",
      horaCierre: ""
    }
   

  }

  initvalue(): void {

    
    this.maestros.getBodega(this.parameterWineries, 'GET').subscribe((bodeg) => {
      this.bodegas = bodeg.bodegas;
      this.bodegas.reverse()
      this.searchArticulo = bodeg.bodegas;
    });
   


  }


  actionExecuted(event): void {
    switch (event.description) {
      case "folder_open":
        // this.abrirArticulo(paramevents.id);
        break;

      case "New":
        this.neWarehouse();
        break;

      default:
        throw new Error(`No existe la acción ${event.action} en la bandeja`);
    }

  }

  neWarehouse(){
    this.router.navigate(['dashboard/createWineries', 0], { skipLocationChange: true });
  }

  editarWarehouse(id){
    this.router.navigate(['dashboard/createWineries', id], { skipLocationChange: true });
  }

  cancel(): void {
    this.distribuc = ''
    this.code = ''
    this.description = ''
    this.observation = ''
    this.contact = ''
    this.phone = ''
    this.estado = ''
    this.postCode = 0;
    this.calleuno = ''
    this.calledos = ''
    this.openTime = ''
    this.closeTime = ''
    this.nameCiudad = ''
    this.countryName = ''
    this.state = ''
    this.email1 = ''
    this.email2 = ''
   
 
    // this.ngSelectComponent.clearModel();
    
  }

  volverAbuscar() {
    this.inputSearc = true
    this.selecOpcion = false;
    this.inputSearc1 = true
    this.selecOpcion1 = false;
    this.selectPost = true;
    this.mostrarPost = false;
    this.mostrarCiudad = false;
    this.nameCiudad = "";
    this.ciudad = "";

    this.state = "";
    this.postCode = "";
    this.poListCod = [];
    this.countryName = "";
  }
 
  search(event) {

    if (event.target.value.length >= 3) {
      this.searchIntoData(event.target.value);
    } else {
      this.bodegas;
      // this.MensajeAdvertenciaOut.emit('Debe digitar mas de 3 digitos.');
    }


  }

  searchIntoData(datos) {
    // this.searchArticulo = this.bodegas;
    let searchTerm = datos;
    if (!searchTerm) {

    }
    if (searchTerm && searchTerm.trim() != "") {
      this.bodegas = this.searchArticulo.filter((item) => {
        return (
          item.codigo.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1 || (item.contacto.toLowerCase().indexOf(searchTerm.toLowerCase()) >
            -1) || (item.descripcion.toLowerCase().indexOf(searchTerm.toLowerCase()) >
              -1)
        )
      });

      if (this.bodegas.length == 0) {
        this.mostrar = true;
        this.searclist = false;
        this.returnList = true;
        // this.bodegas = this.searchArticulo;
      } else {
        this.mostrar = false;
        this.searclist = false;
        this.returnList = true;
      }


      this.articSearch = "";
    }
  }

  borrar(datos) {
    this.parameterWineries = {
      idBodega: datos.idBodega,
      codigo: datos.codigo,
      descripcion: datos.descripcion,
      observaciones: datos.observaciones,
      contacto: datos.contacto,
      telefono: datos.telefono,
      idCentroDistribucion: parseInt(datos.idCentroDistribucion),
      idUsuarioModificacion: 61,
      fechaModificacion: datos.fechaModificacion,
      estado: datos.estado,
      idCiudad: parseInt(datos.idCiudad),
      codigoPostal: datos.codigoPostal,
      direccion: datos.direccion,
      direccion2: datos.direccion2,
      horaApertura: datos.horaApertura,
      horaCierre: datos.horaCierre,
      correoOp: datos.correoOp,
      correoFin: datos.correoFin
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
        this.maestros.getBodega(this.parameterWineries, 'DEL').subscribe((marc) => {
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

  limpiar() {
    this.bodegas = this.searchArticulo;
    this.searclist = true;
    this.returnList = false;
    this.mostrar = false;
  }

}
