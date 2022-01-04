import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/shared/services/dataBase/database.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import * as moment from 'moment';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-postCode',
  templateUrl: './postCode.component.html',
  styleUrls: ['./postCode.component.css']
})
export class PostCodeComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  citiessearch: any;
  parameterCiudad: any;
  parameterPostCode: any
  parameterPais: any;
  searchCity: any;
  cityList: any;
  articSearch: any;
  id: any;
  descripcion: any;
  state: any;
  region: any;
  coutrieName: any;
  posCodeList: any;
  code: any
  city: any
  codigo : any
  mostrar: boolean = false;
  pagination: number = 1;
  cities: any;
  inputSearc: boolean = true;
  selecOpcion: boolean = false;
  searclist: boolean = true;
  returnList: boolean = false;
  postCode: FormGroup;
  submitted = false;
  horaActual: any ;
  infoEdit;
  poListCod: any;
  itemsPages: number = 5;
  constructor(public maestros: DatabaseService, private formBuilder: FormBuilder) {
    this.initParameter();
  }

  ngOnInit(): void {
    this.initvalue();
    this.horaActual = moment().format()


    this.postCode = this.formBuilder.group(
      {

        codigo: ["", Validators.required,],
        descripcion: ["", Validators.required],
        idCiudad: ["", Validators.required],


      }
    );
  }

  initParameter() {
    this.parameterCiudad = {
      idCiudad: 0,
      codigo: "",
      descripcion: "",
      regionEstado: "",
      idPais: 0
    }

    this.maestros.getCiudad(this.parameterCiudad, 'GET').subscribe((citi) => {
      this.citiessearch = citi.ciudades;
      

    });
    this.action = [
      {
        description: "New",
        icon: "mdi mdi-plus-circle",
      },
    ];

   

    this.parameterPostCode = {
      idCodigoPostal: 0,
      codigo: "",
      descripcion: "",
      idCiudad: 0,
    }
  }

  initvalue(): void {
    this.maestros.getCodigoPostal(this.parameterPostCode, 'GET').subscribe((citi) => {
      this.posCodeList = citi.codigosPostales;
      this.searchCity  = citi.codigosPostales;

    });

  }

  validarItem(datos) {
    this.posCodeList = []
    for (const i of Object["values"](datos)) {
      var infoCiudad = this.citiessearch.filter(function (ciudad) {
        return ciudad.idCiudad == i['idCiudad'];
      });
      infoCiudad.forEach(element => {
        i["NombreCiudad"] = `${element.descripcion}`;
      });
      this.posCodeList.push(i)
      this.searchCity =  this.posCodeList;
    }
  }

  cancel(): void {
    this.postCode.reset();
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

  SavePostCode(): void {
    this.parameterCiudad = {
      idCiudad: 0,
      descripcion: this.descripcion,
      idUsuarioModificacion: 0,
      fechaModificacion: this.horaActual,
      idPais: parseInt(this.coutrieName),
      codigoPostal: this.postCode,
      estado: this.state,
      region: this.region
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
    const realCiudad = parseInt(this.postCode.value.idCiudad)
    const resultPosCode = {
      idCodigoPostal: id.value.idCodigoPostal,
      codigo: this.postCode.value.codigo,
      descripcion: this.postCode.value.descripcion,
      idCiudad: realCiudad,
    }

    

    this.maestros.getCodigoPostal(resultPosCode, 'UPD').subscribe((marc) => {
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
    // this.searchCity = this.posCodeList;
    let searchTerm = datos;
    if (!searchTerm) {

    }
    if (searchTerm && searchTerm.trim() != "") {
      this.posCodeList = this.searchCity.filter((item) => {
        
        return (
          item.codigo.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1 || (item.descripcion.toLowerCase().indexOf(searchTerm.toLowerCase()) >
              -1)
        )
      });

      if (this.posCodeList.length == 0) {
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

  buscarCiudad(event) {
    if (event.target.value.length >= 3) {
      this.parameterCiudad = {
        idCiudad: 0,
        descripcion: event.target.value,
        idUsuarioModificacion: 61,
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

  limpiar() {
    this.posCodeList = this.searchCity;
    this.searclist = true;
    this.returnList = false;
    this.mostrar = false
    
  }

  borrar(datos) {

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
        this.maestros.getCodigoPostal(datos, 'DEL').subscribe((marc) => {
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
        });
      }
    })
  }

  editar(datos) {
    this.postCode = this.formBuilder.group(
      {
        idCodigoPostal: [datos.idCodigoPostal],
        codigo: [datos.codigo, Validators.required],
        descripcion: [datos.descripcion, Validators.required],
        idCiudad: [datos.idCiudad, Validators.required],


      }
    );
    // this.infoEdit = datos;


    // var infoCiudad = this.citiessearch.filter(function (ciudad) {
    //   return ciudad.idCiudad == datos['idCiudad'];
    // });
    // infoCiudad.forEach(element => {
    //   datos["NombreCiudad"] = `${element.descripcion}`;
    // });
    // this.infoEdit.push(datos)
    $('#editMark').modal('show')


  }

  get form() {
    return this.postCode.controls

  }

  sendPostCode() {
    this.submitted = true
    const realCiudad = parseInt(this.postCode.value.idCiudad)


    if (this.postCode.value.codigo != undefined) {
      const resultPosCode = {
        idCodigoPostal: 0,
        codigo: this.postCode.value.codigo,
        descripcion: this.postCode.value.descripcion,
        idCiudad: realCiudad,

      }

      this.maestros.getCodigoPostal(resultPosCode, 'INS').subscribe((marc) => {
        
        $('#staticBackdrop').modal('hide')

        Swal.fire(
          'Good job!',
          'success',
        )
        location.reload()

      });

    }



    if (this.postCode.invalid) {
      return;
    }


  }

}
