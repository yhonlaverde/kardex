import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/dataBase/database.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import * as moment from 'moment';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-distribution-center',
  templateUrl: './distribution-center.component.html',
  styleUrls: ['./distribution-center.component.css']
})
export class DistributionCenterComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  parameterCiudad: any;
  cities: any;
  parameterDistribucion: any;
  distribucionList: any;
  inputSearc: boolean = true;
  selecOpcion: boolean = false;
  code: any;
  description: any;
  contact: any;
  phone: any;
  city: any;
  address: any;
  observation: any;
  id: any;
  nameCiudad: any;
  pagination: number = 1;
  searchDistribucionList: any;
  mostrar: boolean = false;
  searclist: boolean = true;
  returnList: boolean = false;
  articSearch: any;
  itemsPages: number = 5;
  horaActual:any
  constructor(public maestros: DatabaseService) {


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
    this.parameterCiudad = {
      idCiudad: 0,
      descripcion: "",
      idUsuarioModificacion: 0,
      fechaModificacion: this.horaActual,
      idPais: 0,
      codigoPostal: "",
      estado: "",
      region: ""
    }

    this.parameterDistribucion = {
      idCentroDistribucion: 0,
      codigo: "",
      descripcion: "",
      observaciones: "",
      contacto: "",
      telefono: "",
      direccion: "",
      idCiudad: 0
    }
  }

  initvalue(): void {

    this.maestros.getCiudad(this.parameterCiudad, 'GET').subscribe((citi) => {
      this.cities = citi.ciudades;
 });

    this.maestros.getDistribucionCenter(this.parameterDistribucion, 'GET').subscribe((distri) => {
      this.distribucionList = distri.centrosDistribucion;
      this.distribucionList.reverse()
      this.searchDistribucionList = distri.centrosDistribucion;

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

  SaveDistribucion(): void {
    if (this.validarEnvioAGuardar()) {
      this.parameterDistribucion = {
        idCentroDistribucion: 0,
        codigo: this.code,
        descripcion: this.description,
        observaciones: this.observation,
        contacto: this.contact,
        telefono: this.phone,
        direccion: this.address,
        idCiudad: parseInt(this.city)
      }

      this.maestros.getDistribucionCenter(this.parameterDistribucion, 'INS').subscribe((marc) => {
       
        Swal.fire({
          title: 'Save Correct!',
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: 'Ok',
          denyButtonText: `Don't save`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            $('#staticBackdrop').modal('hide')
            location.reload()
          } else if (result.isDenied) {
           
          }
        })


      });
    } else {
      Swal.fire(
        'error!',
        'Required fields are mandatory!',
        'error'
      )
    }
  }


  

  buscarCiudad(event) {
    if (event.target.value.length >= 3) {
      this.parameterCiudad = {
        idCiudad: 0,
        descripcion: event.target.value,
        idUsuarioModificacion: 0,
        fechaModificacion: this.horaActual,
        idPais: 0,
        codigoPostal: "",
        estado: "",
        region: ""
      }
      this.maestros.getCiudad(this.parameterCiudad, 'GET').subscribe((pais) => {
        this.cities = pais.ciudades;

        if (this.cities.length == 0) {
          this.inputSearc = true
          this.selecOpcion = false;

        } else {
          this.selecOpcion = true;
          this.inputSearc = false
        }

      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'You must enter more than 3 digits ',
        showConfirmButton: false,
        timer: 1700
      })
      // this.MensajeAdvertenciaOut.emit('Debe digitar mas de 3 digitos.');
    }
  }
  cancel(): void {
    this.code = '',
      this.description = ''
    this.observation = ''
    this.contact = ''
    this.phone = ''
    this.address = ''
    this.city = ''
  }

  volverAbuscar() {
    this.inputSearc = true
    this.selecOpcion = false;
    this.nameCiudad = "";
  }

  Editdistribu(id): void {
    if (this.validarEnvioAGuardar()) {
      this.parameterDistribucion = {
        idCentroDistribucion: id,
        codigo: this.code,
        descripcion: this.description,
        observaciones: this.observation,
        contacto: this.contact,
        telefono: this.phone,
        direccion: this.address,
        idCiudad: parseInt(this.city)
      }
  
      this.maestros.getDistribucionCenter(this.parameterDistribucion, 'UPD').subscribe((marc) => {
  
        Swal.fire({
          title: 'Update Correct!',
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: 'Ok',
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
    }else {
      Swal.fire(
        'error!',
        'Required fields are mandatory!',
        'error'
      )
    }
   
  }

  search(event) {
    if (event.target.value.length >= 3) {
      this.searchIntoData(event.target.value);
    } else {
      this.distribucionList;
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

    let searchTerm = datos;
    if (!searchTerm) {

    }
    if (searchTerm && searchTerm.trim() != "") {
      this.distribucionList = this.searchDistribucionList.filter((item) => {
        return (
          item.codigo.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1 || (item.descripcion.toLowerCase().indexOf(searchTerm.toLowerCase()) >
            -1) || (item.observaciones.toLowerCase().indexOf(searchTerm.toLowerCase()) >
              -1)
        )
      });

      if (this.distribucionList.length == 0) {
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
    this.distribucionList = this.searchDistribucionList;
    this.searclist = true;
    this.returnList = false;
    this.mostrar = false;
  }


  private validarEnvioAGuardar() {

    if (this.code == undefined || this.code == "") {

      return false;
    }

    if (this.description == undefined || this.description == "") {
      return false;
    }

    if (this.contact == undefined || this.contact == "") {
      return false;
    }
    return true;
  }

  borrar(datos) {
    this.parameterDistribucion = {
      idCentroDistribucion: datos.idCentroDistribucion,
      codigo: datos.codigo,
      descripcion: datos.descripcion,
      observaciones: datos.observaciones,
      contacto: datos.contacto,
      telefono: datos.telefono,
      direccion: datos.direccion,
      idCiudad: parseInt(datos.idCiudad)
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
        this.maestros.getDistribucionCenter(this.parameterDistribucion, 'DEL').subscribe((marc) => {
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
    this.id = datos.idCentroDistribucion
    this.code = datos.codigo;
    this.description = datos.descripcion;
    this.description = datos.descripcion;
    this.observation = datos.observaciones;
    this.contact = datos.contacto;
    this.phone = datos.telefono;
    this.address = datos.direccion;
    this.city = datos.idCiudad;
  }

}
