import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/dataBase/database.service';
import { PostCodeService } from 'src/app/shared/services/dataBase/postCode.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import * as moment from 'moment';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.css']
})


export class CreateSupplierComponent<t, k> implements OnInit {
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
  idProve: any;
  suburb: any;
  mostrarSelect: boolean;
  mostrarcodigo: boolean = false;
  emailmultiple: any;
  emailList: string[];
  constructor(public maestros: DatabaseService,
     public _PosService: PostCodeService, private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.parameterPostCode = {
      idCodigoPostal: 0,
      codigo: "",
      descripcion: "",
      idCiudad: 0,
    }
    this.activatedRoute.params
      .subscribe(
        (Params) => {
          this.idProve = Params['id'];
          if (this.idProve == 0) { } else {
            this.spinner.show();
            this.EditGetSupplier();
          }
        }
      );

    this.initParameter();
  }

  ngOnInit(): void {
    this.initvalue();
    this.horaActual = moment().format()
  }

  initParameter() {
    this.parameterPais = {
      idPais: 0,
      codigo: "",
      descripcion: "",
    }
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

    // this.parameterPostCode = {
    //   idCodigoPostal: 0,
    //   codigo: "",
    //   descripcion: "",
    //   idCiudad: 0,
    // }
  }

  initvalue(): void {
    this.maestros.getPais(this.parameterPais, 'GET').subscribe((citi) => {
      this.paises = citi.paises;
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

  validateEmail(email) {
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

  EditGetSupplier() {
    this.parameterSupplier = {
      idProveedor: parseInt(this.idProve),
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
    this.maestros.getProveedor(this.parameterSupplier, 'GET').subscribe((client) => {
      this.clientListSearch = client.proveedores;
      this.searchCustomer = client.proveedores
      this.editar(this.clientListSearch);
    })
  }

  actionExecuted(event): void {
    switch (event.description) {
      case "Cancel":
        location.reload()
        // this.abrirArticulo(paramevents.id);
        break;

      case "Save":
        this.SaveCustomer();
        break;

      default:
        throw new Error(`No existe la acción ${event.action} en la bandeja`);
    }
  }

  cancel(): void {
    this.code = ''
    this.identificacion = ''
    this.name = ''
    this.calleuno = ''
    this.phone = ''
    this.contact = ''
    this.observation = ''
    this.city = ''
    this.emailOp = ''
    this.estado = ''
    this.address = ''
    this.idpais = ''
    this.calledos = ''
    this.postCode = ''
    this.calleuno = ''
    this.emailFin = ''
    this.state = ''
    this.countryName = ''
    this.nameCiudad = ''
    this.postCode = ''
  }


  onKey(value: any) {
    this.open = true
  }

  validarItemsSearch(inven) {
    this.postcodLISTA = [];
    for (const i of Object["values"](inven)) {
      i["NombreCiudades"] = `${i["codigo"]} - ${i["descripcion"]} - ${i["ciudad"]} - ${i["pais"]}`;
      var infos = this.paises.filter(function (pais) {
        return pais.descripcion == i["pais"];
      });
      i["idPais"] = `${infos[0].idPais}`;
      this.postcodLISTA.push(i);
    }
    this.codigoPostalBuffer = this.postcodLISTA.slice(0, this.bufferSize);
    this.loading = false;
    this.codigoPostalBuffer.reverse()
    this.mostrarSelect = true;
    this.mostrarcodigo = false;
    this.open = true

  }

  onScrollToEnd() {
    this.fetchMore();
  }

  onScroll({ end }) {
    if (this.loading || this.postcodLISTA.length <= this.photosBuffer.length) {
      return;
    }

    if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.photosBuffer.length) {
      this.fetchMore();
    }
  }

  private fetchMore() {
    const len = this.photosBuffer.length;
    const more = this.postcodLISTA.slice(len, this.bufferSize + len);
    this.loading = true;
    // using timeout here to simulate backend API delay
    setTimeout(() => {
      this.loading = false;
      this.photosBuffer = this.photosBuffer.concat(more);
    }, 200)
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
          this.buscarPost(event);

        } else {
          this.selecOpcion = true;
          this.inputSearc = false
          this.validarItemsSearch(this.cities);
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

  buscarPost(event) {

    let searchTerm = event.target.value;
    if (!searchTerm) {

    }
    if (searchTerm && searchTerm.trim() != "") {
      this.cities = this.posCodeList.filter((item) => {


        return (
          item.descripcion.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1
        )
      });

      if (this.cities.length == 0) {
        this.inputSearc = true
        this.selecOpcion = false;
        // this.bodegas = this.searchArticulo;
      } else {
        this.selecOpcion = true;
        this.inputSearc = false
      }
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


  SaveCustomer(): void {
    if (this.idProve == 0) {
      if (this.validarEnvioAGuardar()) {
        this.parameterSupplier = {
          idProveedor: 0,
          codigo: this.code,
          identificacion: this.identificacion,
          nombre: this.name,
          direccion: this.calleuno,
          telefono: this.phone,
          contacto: this.contact,
          observaciones: this.observation,
          idCiudad: parseInt(this.nameCiudad),
          codigoPostal: this.postCodestr.toString(),
          correo: this.emailmultiple,
          idUsuarioModificacion: 61,
          fechaModificacion: "2021-09-30T14:19:54.114Z",
          estado: this.estado,
          idPais: parseInt(this.country),
          direccion2: this.calledos,
          correoFin: this.emailFin,
        }
        this.maestros.getProveedor(this.parameterSupplier, 'INS').subscribe((marc) => {
          if (marc.mensaje.msgId == -1) {
            Swal.fire(
              'error!',
              marc.mensaje.msgStr,
              'error'
            )
          } else {
            Swal.fire({
              title: 'Save Correct!',
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
          }


        });
      } else {
        Swal.fire(
          'error!',
          'Required fields are mandatory!',
          'error'
        )
      }
    } else {
      this.EditCustomer(this.idProve)
    }
  }

  EditCustomer(id): void {
    if (this.validarEnvioAGuardar()) {
      this.parameterSupplier = {
        idProveedor: parseInt(id),
        codigo: this.code,
        identificacion: this.identificacion,
        nombre: this.name,
        direccion: this.calleuno,
        telefono: this.phone,
        contacto: this.contact,
        observaciones: this.observation,
        idCiudad: parseInt(this.nameCiudad),
        codigoPostal: this.postCodestr.toString(),
        correo: this.emailmultiple,
        idUsuarioModificacion: 61,
        fechaModificacion: "2021-09-30T14:19:54.114Z",
        estado: this.estado,
        idPais: parseInt(this.country),
        direccion2: this.calledos,
        correoFin: this.emailFin,
      }
      this.maestros.getProveedor(this.parameterSupplier, 'UPD').subscribe((marc) => {
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

  customSearchFn(term) {
    if (term.target.value.length > 2) {
      this.loading = true;
      this._PosService.getPostCodeSearch(term.target.value).subscribe((result) => {
        // this.postcodLISTA = result;
        this.validarItemsSearch(result)
        this.open = true
      })

    } else {}
  }

  cargarCiudad(){
    this.parameterPais = {
      idPais: 0,
      codigo: "",
      descripcion: "",
    }
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

  editar(datos) {
    this.cargarCiudad()
    this.id = datos[0].idProveedor;
    this.code = datos[0].codigo;
    this.observation = datos[0].observaciones;
    this.contact = datos[0].contacto;
    this.phone = datos[0].telefono;
    this.city = datos[0].idCiudad;
    this.estado = datos[0].estado;
    this.identificacion = datos[0].identificacion;
    this.name = datos[0].nombre;
    this.calleuno = datos[0].direccion;
    this.emailmultiple = datos[0].correo;
    this.country = datos[0].idPais;
    this.calledos = datos[0].direccion2;
    this.postCode = datos[0].codigoPostal;
    this.emailFin = datos[0].correoFin;
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

  infoEditPost(event) {

    var infos = this.postcodLISTA.filter(function (post) {
      return post.idCodigoPostal == event;
    });

    if (infos.length == 0) {
      this.nameCiudad = "";
      this.state = "";
      this.postCode = "";
      this.poListCod = [];
      this.countryName = "";
      this.postLISTA = [];
    } else {
      this.state = infos[0].state;
      this.country = infos[0].idPais;
      this.countryName = infos[0].NombrePais;
      this.postCodestr = infos[0].idCodigoPostal;
      this.postCode = infos[0].idCodigoPostal;
      this.nameCiudad = infos[0].idCiudad;
      var infoslis = this.citieslist.filter(function (post) {
        return post.idCiudad == infos[0].idCiudad;
      });
      this.ciudad = infoslis[0].descripcion;
    }

  }

  private validarEnvioAGuardar() {

    if (this.code == undefined || this.code == "") {

      return false;
    }

    if (this.name == undefined || this.name == "") {

      return false;
    }

    if (this.identificacion == undefined || this.identificacion == "") {

      return false;
    }
    if (this.calleuno == undefined || this.calleuno == "") {

      return false;
    }
    if (this.nameCiudad == undefined || this.nameCiudad == "") {

      return false;
    }
    if (this.contact == undefined || this.contact == "") {

      return false;
    }
    if (this.postCode == undefined || this.postCode == "") {

      return false;
    }

    if (this.phone == undefined || this.phone == "") {

      return false;
    }

    return true;

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

  infoCity(event) {

    var infos = this.postcodLISTA.filter(function (post) {
      return post.idCodigoPostal == event;
    });

    if (infos.length == 0) {
      // this.nameCiudad = "";
      this.open = false
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

}