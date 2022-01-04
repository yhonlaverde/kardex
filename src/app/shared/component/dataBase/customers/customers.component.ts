import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/shared/services/dataBase/database.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import * as moment from 'moment';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  parameterCiudad: any;
  parameterCliente: any;
  parameterFreight: any;
  clientListSearch: any;
  clientList: any;
  articSearch: any;
  searchCustomer: any;
  cities: any;
  mostrar: boolean = false;
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
  parameterPais: any;
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
  region: any;
  freight: any;
  horaActual: any
  pagination: number = 1;
  dayformArray: Array<any> = [];
   nameDays = [ 
    {name :"Monday", id: 1},
    {name :"Tuesday", id: 2},
    {name :"Wednesday", id: 3},
    {name :"Thursday", id: 4},
    {name :"Friday", id: 4},
    {name :"Saturday", id: 4}
  ];

  itemsPages: number = 5;

  constructor(public maestros: DatabaseService, private router: Router) {
    this.initParameter();
  }

  ngOnInit(): void {
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

    this.parameterCliente = {
      idCliente: 0,
      codigo: "",
      identificacion: "",
      nombre: "",
      direccion: "",
      telefono: "",
      contacto: "",
      observaciones: "",
      idCiudad: 0,
      correo: "",
      idUsuarioModificacion: 0,
      fechaModificacion: this.horaActual,
      estado: ""
    }

  }

  initvalue(): void {
    this.maestros.getCliente(this.parameterCliente, 'GET').subscribe((client) => {
      this.clientListSearch = client.clientes;
      this.clientListSearch.reverse()
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
    this.id = 0;
    this.router.navigate([`dashboard/createCustomer/${this.id}`], { skipLocationChange: true });
    // this.router.navigate(['dashboard/CrearReserva',  12 ], { skipLocationChange: true });
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
    this.searchCustomer = this.clientListSearch;
    let searchTerm = datos;
    if (!searchTerm) {

    }
    if (searchTerm && searchTerm.trim() != "") {
      this.clientListSearch = this.searchCustomer.filter((item) => {
        return (
          item.codigo.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1 || (item.contacto.toLowerCase().indexOf(searchTerm.toLowerCase()) >
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
    this.parameterCliente = {
      idCliente: datos.idCliente,
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
      fechaModificacion: this.horaActual,
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
        this.maestros.getCliente(this.parameterCliente, 'DEL').subscribe((marc) => {
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
    this.id = datos.idCliente;
    this.router.navigate([`dashboard/createCustomer/${datos.idCliente}`], { skipLocationChange: true });
   
  }

}
