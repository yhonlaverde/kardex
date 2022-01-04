import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/dataBase/database.service';
import { PostCodeService } from 'src/app/shared/services/dataBase/postCode.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-freight-forwarder',
  templateUrl: './freight-forwarder.component.html',
  styleUrls: ['./freight-forwarder.component.css']
})
export class FreightForwarderComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  citiessearch: any;
  parameterCiudad: any;
  parameterPais: any;
  open: boolean = false
  parameterFreight: any;
  parameterPostCode: any;
  cities: any;
  paises: any;
  searchfreight: any;
  cityList: any;
  articSearch: any;
  id: any;
  codigo: any;
  descripcion: any;
  mostrar: boolean = false;
  inputSearc: boolean = true;
  selecOpcion: boolean = false;
  searclist: boolean = true;
  returnList: boolean = false;
  showSpinner: boolean;
  calleuno: any;
  calledos: any;
  city: any;
  state: any;
  postCode: any;
  contac: any;
  phone: any;
  emailCustomerService: any;
  emailOperator: any;
  emailAccounting: any;
  country: any;
  countryName: any;
  nameCiudad: any;
  pagination: number = 1;
  posCodeList: any;
  postCodelist: any;
  postcodLISTA: any;
  poListCod: any
  selectPost: boolean = true;
  citieslist: any;
  postLISTA: any;
  postCodestr: any;
  ciudad: any;
  loading = false;
  horaActual: any;
  photosBuffer = [];
  codigoPostalBuffer = [];
  bufferSize = 50;
  numberOfItemsFromEndBeforeFetchingMore = 10;

  suburb: any;
  mostrarSelect: boolean;
  mostrarcodigo: boolean = false;
  itemsPages: number = 5;
  constructor(public maestros: DatabaseService, public _PosService: PostCodeService, private router: Router,) {
 
    this.initParameter();
  }

  ngOnInit(): void {
    this.initvalue();
    
     this.horaActual = moment().format()
  }

  initParameter() {
    this.parameterFreight = {
      idTransporte: 0,
      descripcion: "",
      direccion: "",
      direccion2: "",
      idCiudad: 0,
      contacto: "",
      telefono: "",
      codigoPostal: "",
      correoClienteServicio: "",
      correoOperador: "",
      correoContabilidad: ""
    }
    this.action = [
      {
        description: "New",
        icon: "mdi mdi-plus-circle",
      },
    ];

  }
  onKey(value: any) {
    this.open = true
  }


  initvalue(): void {

    this.maestros.getTransitario(this.parameterFreight, 'GET').subscribe((freig) => {
      this.citiessearch = freig.transportes;
      this.citiessearch.reverse()
      this.searchfreight = freig.transportes;
    });
  }
 

  actionExecuted(event): void {
    switch (event.description) {
      case "folder_open":
        // this.abrirArticulo(paramevents.id);
        break;

      case "New":
        this.newFreight();
        break;

      default:
        throw new Error(`No existe la acción ${event.action} en la bandeja`);
    }

  }

  newFreight(){
    this.router.navigate(['dashboard/createFreight', 0], { skipLocationChange: true });
  }

  editarFreight(id){
    this.router.navigate(['dashboard/createFreight', id], { skipLocationChange: true });
  }

  search(event) {
    if (event.target.value.length >= 3) {
      this.searchIntoData(event.target.value);
    } else {
      this.citiessearch;
      Swal.fire({
        icon: 'error',
        title: 'You must enter more than 3 digits ',
        showConfirmButton: false,
        timer: 1700
      })
      // this.MensajeAdvertenciaOut.emit('Debe digitar mas de 3 digitos.');
    }

  }

  searchIntoData(datos) {
    this.searchfreight = this.citiessearch;
    let searchTerm = datos;
    if (!searchTerm) {

    }
    if (searchTerm && searchTerm.trim() != "") {
      this.citiessearch = this.searchfreight.filter((item) => {
        return (
          item.descripcion.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1 || (item.direccion.toLowerCase().indexOf(searchTerm.toLowerCase()) >
            -1) || (item.direccion2.toLowerCase().indexOf(searchTerm.toLowerCase()) >
              -1) || (item.contacto.toLowerCase().indexOf(searchTerm.toLowerCase()) >
                -1) || (item.telefono.toLowerCase().indexOf(searchTerm.toLowerCase()) >
                  -1)
        )
      });

      if (this.citiessearch.length == 0) {
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
    this.citiessearch = this.searchfreight;
    this.searclist = true;
    this.returnList = false;
    this.mostrar = false
  }

  private validarEnvioAGuardar() {

    if (this.descripcion == undefined) {

      return false;
    }

    if (this.calleuno == undefined) {
      return false;
    }

    return true;
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


  borrar(datos) {
    this.parameterFreight = {
      idTransporte: datos.idTransporte,
      descripcion: datos.descripcion,
      direccion: datos.direccion,
      direccion2: datos.direccion2,
      idCiudad: datos.idCiudad,
      contacto: datos.contacto,
      telefono: datos.telefono,
      correoClienteServicio: datos.correoClienteServicio,
      correoOperador: datos.correoOperador,
      correoContabilidad: datos.correoContabilidad,
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
        this.maestros.getTransitario(this.parameterFreight, 'DEL').subscribe((marc) => {
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
