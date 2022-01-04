import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/dataBase/database.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent<t, k> implements OnInit {

  action: IAction<t, k>[];
  citiessearch: any;
  parameterCiudad: any;
  searchCity: any;
  cityList: any;
  articSearch: any;
  id: any;
  codigo: any;
  descripcion: any;
  mostrar: boolean = false;
  searclist: boolean = true;
  returnList: boolean = false;
  pagination: number = 1;
  itemsPages: number = 5;
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
      idPais: 0,
      codigo: "",
      descripcion: "",
    }
  }

  initvalue(): void {

    this.maestros.getPais(this.parameterCiudad, 'GET').subscribe((citi) => {
      this.citiessearch = citi.paises;
      this.searchCity = citi.paises;

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
    if (this.validarEnvioAGuardar()) {
      this.parameterCiudad = {
        idPais: 0,
        codigo: this.codigo,
        descripcion: this.descripcion,
      }
  
      this.maestros.getPais(this.parameterCiudad, 'INS').subscribe((marc) => {
        $('#staticBackdrop').modal('hide')
  
        Swal.fire(
          'Good job!',
          'success',
        )
        location.reload()
  
      });
    } else {
      Swal.fire(
        'error!',
        'Required fields are mandatory!',
        'error'
      )
    }
    
  }

  cancel(): void {
    this.codigo = ''
    this.descripcion = ''
  }


  EditCity(id): void {
    this.parameterCiudad = {
      idPais: id,
      codigo: this.codigo,
      descripcion: this.descripcion,
    }

    this.maestros.getPais(this.parameterCiudad, 'UPD').subscribe((marc) => {
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

  private validarEnvioAGuardar() {

    if (this.codigo == undefined) {

      return false;
    }

    if (this.descripcion == undefined) {
      return false;
    }
    return true;
  }

  borrar(datos) {
    this.parameterCiudad = {
      idPais: datos.idPais,
      codigo: datos.codigo,
      descripcion: datos.descripcion,
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
        this.maestros.getPais(this.parameterCiudad, 'DEL').subscribe((marc) => {
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
    this.id = datos.idPais;
    this.codigo = datos.codigo;
    this.descripcion = datos.descripcion;
  }

}
