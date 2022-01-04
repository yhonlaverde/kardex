import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/dataBase/database.service';
import { PostCodeService } from 'src/app/shared/services/dataBase/postCode.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
declare var $: any;

interface Event {
  name: string;
  value: any;
}
@Component({
  selector: 'app-create-wineries',
  templateUrl: './create-wineries.component.html',
  styleUrls: ['./create-wineries.component.css']
})

export class CreateWineriesComponent<t, k> implements OnInit {

  action: IAction<t, k>[];
  parameterWineries: any;
  public showSpinner: boolean;
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
  horaActual: any;
  numberOfItemsFromEndBeforeFetchingMore = 10;
  descriptionValidar: boolean = false;
  idwarehouse: any;
  suburb: any;
  mostrarSelect: boolean;
  mostrarcodigo: boolean = false;
  emailmultiple: any;
  emailList: string[];

  constructor(public maestros: DatabaseService, public _PosService: PostCodeService, 
    private activatedRoute: ActivatedRoute,private spinner: NgxSpinnerService) {

    this.activatedRoute.params
      .subscribe(
        (Params) => {
          this.idwarehouse = Params['id'];

          if (this.idwarehouse == 0) {

          } else {
            this.spinner.show();
            this.editarWarehouses();
          }
        }
      );

    this.parameterPostCode = {
      idCodigoPostal: 0,
      codigo: "",
      descripcion: "",
      idCiudad: 0,
    }



  }

  ngOnInit(): void {
    this.initParameter();
    this.initvalue();
    this.horaActual = moment().format()
  }

  initParameter() {
    this.parameterPais = {
      idPais: 0,
      codigo: "",
      descripcion: "",
    }

    this.action = [
      {
        description: "Save",
        icon: "mdi mdi-content-save",
      }
      ,
      {
        description: "Cancel",
        icon: "mdi mdi-stop-circle",
      },
    ];

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

    this.maestros.getPais(this.parameterPais, 'GET').subscribe((citi) => {
      this.paises = citi.paises;
    });

    this.maestros.getDistribucionCenter(this.parameterDistribucion, 'GET').subscribe((distri) => {
      this.distribucionList = distri.centrosDistribucion;
    });


  }

  separateEmail(e) {
    this.emailList = [];
    let emails = e.target.value.split(',');
    emails.map(email => {
      if (email && email.length > 0) {
        this.emailList.push(email);
      }
    });
    var unitEmail = "";
    this.emailList.map((unid) => {
      unitEmail += unid + ","
    })
    this.emailmultiple = unitEmail;
    this.validateEmail(this.emailList)
  }

  separateEmail2(e) {
    this.emailList = [];
    let emails = e.target.value.split(',');
    emails.map(email => {
      if (email && email.length > 0) {
        this.emailList.push(email);
      }
    });
    var unitEmail = "";
    this.emailList.map((unid) => {
      unitEmail += unid + ","
    })
    this.email2 = unitEmail;
    this.validateEmail(this.emailList)
  }

  validateEmail(email) {
    console
    const regularExpression = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    email.map(element => {

      if (regularExpression.test(element)) {
      } else {
        Swal.fire(
          'Information',
          'the following email ' + element + ' does not comply with the format',
          'info'
        )
      }
    });


  }

  validationHour(event) {
    if (this.openTime >= event) {
      Swal.fire(
        'Error!',
        'The start time is less than the end time',
        'error'
      )
    }
  }

  actionExecuted(event): void {
    switch (event.description) {
      case "Cancel":
        location.reload()
        // this.abrirArticulo(paramevents.id);
        break;

      case "Save":
        this.SaveWineries();
        break;

      default:
        throw new Error(`No existe la acción ${event.action} en la bandeja`);
    }

  }

  crearUnidad(): void {
    $('#staticBackdrop').modal('show')
  }

  SaveWineries() {

    if (this.validarEnvioAGuardar()) {
      if (this.idwarehouse == 0) {
        this.parameterWineries = {
          idBodega: 0,
          codigo: this.code,
          descripcion: this.description,
          observaciones: this.observation,
          contacto: this.contact,
          telefono: this.phone,
          idCentroDistribucion: parseInt(this.distribuc),
          idUsuarioModificacion: 61,
          fechaModificacion: this.horaActual,
          estado: '1',
          idCiudad: parseInt(this.nameCiudad),
          codigoPostal: this.postCodestr.toString(),
          direccion: this.calleuno,
          direccion2: this.calledos,
          horaApertura: this.openTime,
          horaCierre: this.closeTime,
          correoOp: this.emailmultiple,
          correoFin: this.email2
        }
        this.maestros.getBodega(this.parameterWineries, 'INS').subscribe((marc) => {
          Swal.fire({
            title: 'Save Correct!',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Back to List',
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              location.reload()
            } else if (result.isDenied) {

            }
          })

        });
      } else {
        this.EditWineries(this.idwarehouse);
      }

    } else {
      Swal.fire(
        'error!',
        'Required fields are mandatory!',
        'error'
      )
    }

  }

  EditWineries(id): void {

    if (this.validarEnvioAGuardar()) {
      this.parameterWineries = {
        idBodega: parseInt(id),
        codigo: this.code,
        descripcion: this.description,
        observaciones: this.observation,
        contacto: this.contact,
        telefono: this.phone,
        idCentroDistribucion: parseInt(this.distribuc),
        idUsuarioModificacion: 61,
        fechaModificacion: this.horaActual,
        estado: this.estado,
        idCiudad: parseInt(this.nameCiudad),
        codigoPostal: this.postCodestr.toString(),
        direccion: this.calleuno,
        direccion2: this.calledos,
        horaApertura: this.openTime,
        horaCierre: this.closeTime,
        correoOp: this.emailmultiple,
        correoFin: this.email2
      }

      this.maestros.getBodega(this.parameterWineries, 'UPD').subscribe((marc) => {
        Swal.fire({
          title: 'Update Correct!',
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: 'Back To List',
          denyButtonText: `Don't save`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
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

  customSearchFn(term) {
    if (term.target.value.length > 2) {
      this.loading = true;
      this._PosService.getPostCodeSearch(term.target.value).subscribe((result) => {
        // this.postcodLISTA = result;
        this.validarItemsSearch(result)


      })

    } else {
    }
  }

  validarItemsSearch(inven) {
    this.postcodLISTA = [];
    for (const i of Object["values"](inven)) {
      i["NombreCiudades"] = `${i["codigo"]} - ${i["descripcion"]} - ${i["ciudad"]} - ${i["pais"]}`;
      this.postcodLISTA.push(i);
    }
    this.codigoPostalBuffer = this.postcodLISTA.slice(0, this.bufferSize);
    this.codigoPostalBuffer.reverse()
    this.loading = false;
    this.mostrarSelect = true;
    this.mostrarcodigo = false;
    this.open = true;
  }

  onScrollToEnd() {
    this.fetchMore();
  }

  onScroll({ end }) {
    if (this.loading || this.postcodLISTA.length <= this.codigoPostalBuffer.length) {
      return;
    }

    if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.codigoPostalBuffer.length) {
      this.fetchMore();
    }
  }

  private fetchMore() {
    const len = this.codigoPostalBuffer.length;
    const more = this.postcodLISTA.slice(len, this.bufferSize + len);
    this.loading = true;
    // using timeout here to simulate backend API delay
    setTimeout(() => {
      this.loading = false;
      this.codigoPostalBuffer = this.codigoPostalBuffer.concat(more);
    }, 200)
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

  infoCiudad(event) {

    var infos = this.citieslist.filter(function (post) {
      return post.idCiudad == event;
    });

    if (infos.length == 0) {
      this.nameCiudad = "";
    } else {
      this.state = infos[0].regionEstado;
      this.country = infos[0].idPais;
      this.nameCiudad = infos[0].idCiudad;

      var infopais = this.paises.filter(function (pais) {
        return pais.idPais == infos[0].idPais;
      });
      this.countryName = infopais[0].descripcion;
    }

    // this.buscarPost(infos[0].descripcion)
  }

  infoCity(event) {
    this.cargarCiudad();
    var infos = this.postcodLISTA.filter(function (post) {
      return post.idCodigoPostal == event;
    });

    if (infos.length == 0) {
      // this.nameCiudad = "";
      this.open = false
      this.open1 = true
      this.mostrarSelect = true;
      this.mostrarcodigo = false;
      this.suburb = "";
      // this.state = "";
      // this.postCode = "";
      this.poListCod = [];
      // this.countryName = "";

      this.postLISTA = [];
    } else {
      this.open = false
      this.state = infos[0].estado;
      this.country = infos[0].idPais;
      this.countryName = infos[0].pais;
      this.postCodestr = infos[0].idCodigoPostal;
      this.nameCiudad = infos[0].idCiudad;
      this.suburb = infos[0].descripcion;
      this.mostrarSelect = false;
      this.mostrarcodigo = true;
    }

  }

  validarEnvioAGuardar() {

    if (this.code == undefined || this.code == "") {

      return false;
    }

    if (this.description == undefined || this.code == "") {

      return false;
    }

    if (this.calleuno == undefined || this.calleuno == "") {

      return false;
    }

    if (this.contact == undefined || this.contact == "") {

      return false;
    }

    if (this.openTime == undefined || this.openTime == "") {

      return false;
    }
    if (this.closeTime == undefined || this.closeTime == "") {

      return false;
    }

    if (this.distribuc == undefined || this.distribuc == "") {
      return false;
    }
    if (this.phone == undefined || this.phone == "") {
      return false;
    }

    return true;

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

  onKey(value: any) {
    this.open = true
    this.open1 = true
  }


  limpiar() {
    this.bodegas = this.searchArticulo;
    this.searclist = true;
    this.returnList = false;
    this.mostrar = false;
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
              marc.mensaje.msgStr,
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

  cargarCiudad() {

    this.parameterCiudad = {
      idCiudad: 0,
      codigo: "",
      descripcion: "",
      regionEstado: "",
      idPais: 0
    }
    this.maestros.getCiudad(this.parameterCiudad, 'GET').subscribe((citi) => {
      this.citieslist = citi.ciudades;
    });

    this.maestros.getPais(this.parameterPais, 'GET').subscribe((citi) => {
      this.paises = citi.paises;
    });
  }

  editarWarehouses() {

    this.parameterCiudad = {
      idCiudad: 0,
      codigo: "",
      descripcion: "",
      regionEstado: "",
      idPais: 0
    }
    this.maestros.getCiudad(this.parameterCiudad, 'GET').subscribe((citi) => {
      this.citieslist = citi.ciudades;
      this.bodegasValid();
    });


  }

  bodegasValid() {
    this.parameterWineries = {
      idBodega: parseInt(this.idwarehouse),
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
    this.maestros.getBodega(this.parameterWineries, 'GET').subscribe((bodeg) => {
      this.bodegas = bodeg.bodegas;

      this.searchArticulo = bodeg.bodegas;
      this.editar(this.bodegas);
    });
  }

  editar(datos) {
    this.cargarCiudad();
    this.open = false
    this.open1 = false
    this.id = datos[0].idBodega;
    this.code = datos[0].codigo;
    this.description = datos[0].descripcion;
    this.observation = datos[0].observaciones;
    this.contact = datos[0].contacto;
    this.phone = datos[0].telefono;
    this.distribuc = datos[0].idCentroDistribucion;
    this.estado = datos[0].estado;
    this.nameCiudad = datos[0].idCiudad
    this.calleuno = datos[0].direccion
    this.calledos = datos[0].direccion2
    this.openTime = datos[0].horaApertura
    this.closeTime = datos[0].horaCierre
    this.emailmultiple = datos[0].correoOp
    this.email1 = datos[0].correoOp
    this.email2 = datos[0].correoFin
    this.postCode = datos[0].codigoPostal
    //  this.postCode = parseInt(this.postCode)
    this.validarpostedit(this.postCode);
  }

  validarpostedit(event) {
    this.parameterPostCode = {
      idCodigoPostal: parseInt(event),
      codigo: "",
      descripcion: "",
      idCiudad: 0,
    }

    this.maestros.getCodigoPostal(this.parameterPostCode, 'GET').subscribe((citi) => {
      this.posCodeList = citi.codigosPostales;
      this.validarItemsSea(this.posCodeList);

    });
  }

  validarItemsSea(inven) {
   
    this.postcodLISTA = [];

    for (const i of Object["values"](inven)) {
      var infoCiudad = this.citieslist.filter(function (ciudad) {
        return ciudad.idCiudad == i['idCiudad'];
      });
      infoCiudad.forEach(element => {
        var infopais = this.paises.filter(function (pais) {
          return pais.idPais == infoCiudad[0].idPais;
        });
        infopais.forEach(eleme => {
          i["pais"] = `${eleme.descripcion}`;
          i["idPais"] = `${eleme.idPais}`;
          i["NombreCiudades"] = `${i["codigo"]} - ${i["descripcion"]} - ${element.descripcion} - ${eleme.descripcion}`;
        });
        i["ciudad"] = ` ${element.descripcion}`;
        i["state"] = `${element.regionEstado}`;
      });


      this.postcodLISTA.push(i);
     
    }

    this.state = this.postcodLISTA[0].state;
    this.country = this.postcodLISTA[0].idPais;
    this.countryName = this.postcodLISTA[0].pais;
    this.postCodestr = this.postcodLISTA[0].idCodigoPostal;
    this.postCode = this.postcodLISTA[0].idCodigoPostal;
    this.nameCiudad = this.postcodLISTA[0].idCiudad;
    this.suburb = this.postcodLISTA[0].descripcion;
    this.mostrarSelect = false;
    this.mostrarcodigo = true;

    this.codigoPostalBuffer = this.postcodLISTA.slice(0, this.bufferSize);
    this.spinner.hide();
  }

}
