import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/dataBase/database.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from 'src/app/shared/services/articles/articles.service';
import { PostCodeService } from 'src/app/shared/services/dataBase/postCode.service';
import { NgxSpinnerService } from "ngx-spinner";
declare var $: any;

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})


export class CreateCustomerComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  parameterCiudad: any;
  parameterCliente: any;
  parameterFreight: any;
  clientListSearch: any;
  parameterSales: any;
  clientList: any;
  articSearch: any;
  searchCustomer: any;
  cities: any;
  mostrar: boolean = false;
  code: any;
  identificacion = "0";
  name: any;
  address: any;
  articles: any;
  contact: any;
  phone: any;
  email: any;
  city: any;
  estado: "1";
  observation: any;
  id: any;
  parameterPais: any;
  inputSearc: boolean = true;
  selecOpcion: boolean = false;
  calleuno: any;
  calledos: any;
  state: any;
  postCode: any;
  country: any;
  countryName: any;
  paises: any;
  region: any;
  freight: any;
  pagination: number = 1;
  emailList: string[];
  email1: any;
  horaActual: any;
  dayformArray: Array<any> = [];
  days: any;
  nameDays = [
    { name: "Monday", id: 1, status: 0, grupo: "Days" },
    { name: "Tuesday", id: 2, status: 0, grupo: "Days" },
    { name: "Wednesday", id: 3, status: 0, grupo: "Days" },
    { name: "Thursday", id: 4, status: 0, grupo: "Days" },
    { name: "Friday", id: 5, status: 0, grupo: "Days" },
    { name: "Saturday", id: 6, status: 0, grupo: "Days" },
    { name: "Sunday", id: 7, status: 0, grupo: "Days" }
  ];
  parameterPostCode: any;
  posCodeList: any;
  nameCiudad: any;
  postCodelist: any;
  open: boolean = false
  openDay: any;
  isCollapsed = false;
  openTime: any;
  closeTime: any;
  specialIntrutions: any;
  forklitSite: any;
  tailgateRequiere: any;
  handUpload: any;
  freightCompany: any;
  deliveryMethod: any;
  creditHold: any;
  valuedContador: any[];
  emailmultiple: any;
  postcodLISTA: any;
  poListCod: any
  selectPost: boolean = true;
  tablaConItems: boolean = false;
  detalleAcordion: boolean;
  citieslist: any;
  postLISTA: any;
  postCodestr: any;
  ciudad: any;
  loading = false;
  address2: any;
  codigoPostalBuffer = [];
  bufferSize = 50;
  numberOfItemsFromEndBeforeFetchingMore = 10;
  suburb: any;
  mostrarSelect: boolean;
  mostrarcodigo: boolean = false;
  separardias: any;
  salesArea: any;
  salesAreaList:any;
 
horariosCliente:any;
  constructor(public inventario: ArticlesService,
    public maestros: DatabaseService,
    private activatedRoute: ActivatedRoute,
    public _PosService: PostCodeService,
    private spinner: NgxSpinnerService) {
    this.valuedContador = [];

    this.horariosCliente = [
      {
        idHorarioCliente: 0,
        idCliente: 0,
        diasApertura: "",
        horaApertura: "",
        horaCierre: ""
      }
    ]

    this.activatedRoute.params
      .subscribe(
        (Params) => {
          this.id = Params['id'];

          if (this.id == 0) {

          } else {
            this.spinner.show();
            this.editar(this.id);
          }
        }
      );
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
    this.parameterSales = {
      idAreaVenta: 0,
      codigo: "",
      descripcion: ""
    }

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
        icon: "mdi mdi-plus-circle",
      },
      {
        description: "Cancel",
        icon: "mdi mdi-stop-circle",
      },
    ];

    this.parameterFreight = {
      idTransporte: 0,
      descripcion: "",
      direccion: "",
      direccion2: "",
      idCiudad: 0,
      contacto: "",
      telefono: "",
      correoClienteServicio: "",
      correoOperador: "",
      correoContabilidad: ""

    }
    this.parameterPostCode = {
      idCodigoPostal: 0,
      codigo: "",
      descripcion: "",
      idCiudad: 0,
    }
  }

  addCampos(): void {
    var horariosCliente = {
        idHorarioCliente: 0,
        idCliente: 0,
        diasApertura: "",
        horaApertura: "",
        horaCierre: ""
      }
    this.horariosCliente.push(horariosCliente)
    

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

  filterCoffe() {
    const parameter = {
      idBandeja: '3',
      busqueda: this.articSearch
    }
    this.inventario.searchArticles(parameter).subscribe((res) => {
      this.validarItemsSearchProduct(res.data);
      $('#filterModal').modal('show');
    });
  }


  AddProduct(): void {
    $('#filterModal').modal('hide')
    this.tablaConItems = true;
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

  initvalue(): void {

    this.maestros.getPais(this.parameterPais, 'GET').subscribe((citi) => {
      this.paises = citi.paises;
    });

    this.maestros.getTransitario(this.parameterFreight, 'GET').subscribe((freig) => {
      this.freight = freig.transportes;
    });

    this.maestros.getareaVenta(this.parameterSales, 'GET').subscribe((sub) => {
      this.salesAreaList = sub.areasVenta;
    });

  }
  // private getConfiguration(): void {
  //   this._PosService.getConfig$().subscribe((citi) => {
  //     this.posCodeList = citi.codigosPostales;
  //     this.validarItemsSearch(this.posCodeList);
  //   });
  // }

  onKey(value: any) {
    this.open = true
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


  detalle() {
    $('#see').modal('show')
  }


  actionExecuted(event): void {
    switch (event.description) {
      case "folder_open":
        // this.abrirArticulo(paramevents.id);
        break;

      case "Save":
        this.SaveCustomer();
        break;

      case "Cancel":
        location.reload();
        break;

      default:
        throw new Error(`No existe la acción ${event.action} en la bandeja`);
    }

  }

  crearUnidad(): void {
    $('#staticBackdrop').modal('show')
  }

  SaveCustomer(): void {
    if (this.id == 0) {

      if (this.validarEnvioAGuardar()) {
        const diasAper = [];
        this.horariosCliente.map(element => {
          const hola =  element.diasApertura.join(",");
          element.diasApertura = hola;
          diasAper.push(hola);
        });
        this.parameterCliente = {
          idCliente: 0,
          codigo: this.code,
          identificacion: this.identificacion,
          nombre: this.name,
          direccion: this.address,
          telefono: this.phone,
          contacto: this.contact,
          observaciones: this.observation,
          idCiudad: parseInt(this.nameCiudad),
          correo: this.emailmultiple,
          idUsuarioModificacion: 61,
          fechaModificacion: this.horaActual,
          estado: "1",
          diasApertura: this.openDay,
          horaApertura: this.openTime,
          horaCierre: this.closeTime,
          instruccionesEspeciales: this.specialIntrutions,
          montaCargasSitio: this.forklitSite,
          requierePortonTrasero: this.tailgateRequiere,
          cargaManual: this.handUpload,
          empresaTransportePreferida: this.freightCompany,
          metodoEntregaPreferido: this.deliveryMethod,
          creditoEspera: this.creditHold,
          finCorreoElectronico: this.email1,
          direccion2: this.address2,
          areaVenta: this.salesArea,
          idListaPrecio: 2,
         idAreaVenta: parseInt(this.salesArea),
          horariosCliente:this.horariosCliente,
          codigoPostal: this.postCodestr.toString(),
        }
        
        this.maestros.getCliente(this.parameterCliente, 'INS').subscribe((marc) => {
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
          //location.reload()

        });
      } else {
        Swal.fire(
          'error!',
          'Required fields are mandatory!',
          'error'
        )
      }
    } else {
      this.EditCustomer(this.id);

    }

  }

  EditCustomer(id): void {
    const diasAper = [];
      this.horariosCliente.map(element => {
        const hola =  element.diasApertura.join(",");
        element.diasApertura = hola;
        diasAper.push(hola);
      });
    this.parameterCliente = {
      idCliente: parseInt(id),
      codigo: this.code,
      identificacion: this.identificacion,
      nombre: this.name,
      direccion: this.address,
      telefono: this.phone,
      contacto: this.contact,
      observaciones: this.observation,
      idCiudad: parseInt(this.nameCiudad),
      correo: this.emailmultiple,
      idUsuarioModificacion: 61,
      fechaModificacion: this.horaActual,
      estado: this.estado,
      diasApertura: this.openDay,
      horaApertura: this.openTime,
      horaCierre: this.closeTime,
      instruccionesEspeciales: this.specialIntrutions,
      montaCargasSitio: this.forklitSite,
      requierePortonTrasero: this.tailgateRequiere,
      cargaManual: this.handUpload,
      empresaTransportePreferida: this.freightCompany,
      metodoEntregaPreferido: this.deliveryMethod,
      creditoEspera: this.creditHold,
      direccion2: this.address2,
      finCorreoElectronico: this.email1,
      idListaPrecio: 2,
      idAreaVenta: parseInt(this.salesArea),
      horariosCliente:this.horariosCliente,
      codigoPostal: this.postCodestr.toString(),
    }

    this.maestros.getCliente(this.parameterCliente, 'UPD').subscribe((marc) => {

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
  }

  validarItemsSearchProduct(inven) {
    this.articles = [];
    for (const i of Object["values"](inven)) {
      i["descripcion"] = `${i["Descripción"]}`;
      i["codigoInternoPMI"] = `${i["Cod. Int. PMI"]}`;
      i["observacion"] = `${i["Observación"]}`;
      i["posicionPrincipal"] = `${i["Posición Principal"]}`;
      i["patronEstriba"] = `${i["Patrón Estiba"]}`;
      i["valorUnitario"] = `${i["Costo Unitario"]}`;
      i["classification"] = `${i["Clasificación"]}`;
      i["CalificacionCata"] = `${i["Calificación Cata"]}`;
      i["ProcesoItem"] = `${i["Proceso Item"]}`;
      i["SubCategoria"] = `${i["SubCategoría"]}`;
      this.articles.push(i);
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

  buscarCiudad(event) {
    if (event.target.value.length >= 3) {
      this.parameterCiudad = {
        idCiudad: 0,
        descripcion: event.target.value,
        idUsuarioModificacion: 61,
        fechaModificacion: "2021-10-19T13:27:48.872Z",
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

  checkPush(ev) {
    ev.forEach(element => {
      const valued = this.nameDays.filter(x => x.id == element.id)
      // const unicos = [];
      // for (var i = 0; i < this.nameDays.length; i++) {

      //   const elemento = this.nameDays[i];

      //   if (!unicos.includes(this.nameDays[i])) {
      //     unicos.push(elemento);
      //   }
      // }
       
    });
    
      

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


  private validarEnvioAGuardar() {

    if (this.code == undefined) {

      return false;
    }

    if (this.name == undefined) {

      return false;
    }

    if (this.identificacion == undefined) {

      return false;
    }

    return true;

  }

  cargarCiudad() {
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


  editar(id) {
    this.cargarCiudad()

    this.parameterCliente = {
      idCliente: parseInt(id),
      codigo: '',
      identificacion: '',
      nombre: '',
      direccion: '',
      telefono: '',
      contacto: '',
      observaciones: '',
      idCiudad: 0,
      correo: '',
      idUsuarioModificacion: 61,
      fechaModificacion: "2021-10-26T19:14:19.418Z",
      estado: '',
      diasApertura: '',
      horaApertura: '',
      horaCierre: '',
      instruccionesEspeciales: '',
      montaCargasSitio: '',
      requierePortonTrasero: '',
      cargaManual: '',
      empresaTransportePreferida: '',
      metodoEntregaPreferido: '',
      creditoEspera: '',
      finCorreoElectronico: '',
      codigoPostal: ''
    }
    this.maestros.getCliente(this.parameterCliente, 'GET').subscribe((client) => {

      this.clientListSearch = client.clientes;
      this.code = this.clientListSearch[0].codigo;
      this.observation = this.clientListSearch[0].observaciones;
      this.contact = this.clientListSearch[0].contacto;
      this.phone = this.clientListSearch[0].telefono;
      this.city = this.clientListSearch[0].idCiudad;
      this.estado = this.clientListSearch[0].estado;
      this.identificacion = this.clientListSearch[0].identificacion;
      this.name = this.clientListSearch[0].nombre;
      this.address = this.clientListSearch[0].direccion;
      this.address2 = this.clientListSearch[0].direccion2;
      this.emailmultiple = this.clientListSearch[0].correo;
      this.salesArea = this.clientListSearch[0].idAreaVenta;
      this.horaActual = this.clientListSearch[0].fechaModificacion
      this.estado = this.clientListSearch[0].estado
      this.openDay = this.clientListSearch[0].diasApertura
      this.openTime = this.clientListSearch[0].horaApertura
      this.closeTime = this.clientListSearch[0].horaCierre
      this.specialIntrutions = this.clientListSearch[0].instruccionesEspeciales
      this.forklitSite = this.clientListSearch[0].montaCargasSitio
      this.tailgateRequiere = this.clientListSearch[0].requierePortonTrasero
      this.handUpload = this.clientListSearch[0].cargaManual
      this.freightCompany = this.clientListSearch[0].empresaTransportePreferida
      this.deliveryMethod = this.clientListSearch[0].metodoEntregaPreferido
      this.creditHold = this.clientListSearch[0].creditoEspera
      this.email1 = this.clientListSearch[0].finCorreoElectronico
      this.postCode = this.clientListSearch[0].codigoPostal
      this.validarpostedit(this.postCode);
      this.horariosCliente = [];
       this.clientListSearch[0].horariosCliente.map(element => {
        
          //  var intDias =  parseInt(element.diasApertura) ;
          var diasParseado =   this.separarDias(element.diasApertura);
           element.diasApertura = diasParseado;
          this.horariosCliente.push(element)
      });
    });

  }

  separarDias(e) {

    this.separardias = [];
    
    let dias = e.split(',');

    const unicos = [];
    for (var i = 0; i < dias.length; i++) {

      const elemento = parseInt(dias[i]);

      if (!unicos.includes(dias[i])) {
        unicos.push(elemento);
      }
    }

    return unicos;

  }

   cerrar(idArti): void {

  
    var array = [];
    for (var i = 0; i < this.horariosCliente.length; i++) {
      this.horariosCliente[i]['idReal'] = i
      array.push(this.horariosCliente[i])
    }

    var articulo =  array.filter(function (artic) {
        return artic.idReal !== idArti;
      });
      this.horariosCliente = articulo;
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
