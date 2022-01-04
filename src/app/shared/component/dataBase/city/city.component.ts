import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/dataBase/database.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})


export class CityComponent<t, k>implements OnInit {
  action: IAction<t, k>[];
  citiessearch: any;
  parameterCiudad: any;
  parameterPais : any;
  searchCity: any;
  cityList:any;
  articSearch:any;
  id : any;
  descripcion: any;
  postCode: any;
  state: any;
  region: any;
  coutrieName: any;
  countries: any;
  mostrar: boolean = false;
  searclist: boolean = true;
  returnList: boolean = false;
  pagination: number = 1;
  itemsPages: number = 8;
  constructor(public maestros: DatabaseService) {
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

    this.parameterCiudad = {
      idCiudad: 0,
      codigo: "",
      descripcion: "",
      regionEstado: "",
      idPais: 0
    }

    this.parameterPais = {
      idPais: 0,
      descripcion: "",
      idUsuarioModificacion: 0,
      fechaModificacion: "2021-09-29T20:06:12.964Z"
    }
  }

  initvalue(): void {

    this.maestros.getCiudad(this.parameterCiudad, 'GET').subscribe((citi) => {
      this.citiessearch = citi.ciudades;
      this.searchCity = citi.ciudades;

    });

    this.maestros.getPais(this.parameterPais, 'GET').subscribe((citi) => {
      this.countries = citi.paises;

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

  SaveCity(): void {
    this.parameterCiudad = {
      idCiudad: 0,
      codigo: this.postCode,
      descripcion: this.descripcion,
      regionEstado: this.state,
      idPais: parseInt(this.coutrieName) 
    }

    this.maestros.getCiudad(this.parameterCiudad, 'INS').subscribe((marc) => {
      $('#staticBackdrop').modal('hide')

      Swal.fire(
        'Good job!',
        'success',
      )
       location.reload()

    });
  }

  EditCity(id): void {
    this.parameterCiudad = {
      idCiudad: id,
      codigo: this.postCode,
      descripcion: this.descripcion,
      regionEstado: this.state,
      idPais: parseInt(this.coutrieName) 
    }

    this.maestros.getCiudad(this.parameterCiudad, 'UPD').subscribe((marc) => {
      $('#editMark').modal('hide')
      Swal.fire({
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1700
      })
       location.reload()

    });
  }

  search(event) {
    if (event.target.value.length >= 3) {
      this.searchIntoData(event.target.value);
    } else {
      this.citiessearch;
      // this.MensajeAdvertenciaOut.emit('Debe digitar mas de 3 digitos.');
    }

  }

  searchIntoData(datos) {
    let searchTerm = datos;
    if (!searchTerm) {

    }
    if (searchTerm && searchTerm.trim() != "") {
      this.citiessearch = this.searchCity.filter((item) => {

        return (
          item.codigo.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1 || (item.descripcion.toLowerCase().indexOf(searchTerm.toLowerCase()) >
            -1) || (item.regionEstado.toLowerCase().indexOf(searchTerm.toLowerCase()) >
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
    this.citiessearch = this.searchCity;
    this.searclist = true;
    this.returnList = false;
    this.mostrar = false
  }
  cancel(): void {
    this.postCode = ''
    this.descripcion =  ''
    this.state = ''
   this.coutrieName = ''
    
  }

  borrar(datos) {
    this.parameterCiudad = {
      idCiudad: datos.idCiudad,
      descripcion: datos.descripcion,
      idUsuarioModificacion: 61,
      fechaModificacion: "2021-10-19T12:54:53.563Z",
      idPais: datos.idPais,
      codigoPostal: datos.codigoPostal,
      estado: datos.estado,
      region: datos.region,
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
        this.maestros.getCiudad(this.parameterCiudad, 'DEL').subscribe((marc) => {
          if (marc.mensaje.msgId == -1) {
            Swal.fire(
              'Not Deleted!',
              'The data cannot be deleted because it is associated with other records. ',
              'info'
            )
          } else{
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
    this.id = datos.idCiudad;
    this.descripcion = datos.descripcion;
    this.coutrieName =  datos.idPais;
    this.postCode = datos.codigo;
    this.state = datos.regionEstado;
    // this.region = datos.region;
    //   regionEstado: this.state,
    //   idPais: this.coutrieName
  }

}
