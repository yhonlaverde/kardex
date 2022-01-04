import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/dataBase/database.service';
import { PostCodeService } from 'src/app/shared/services/dataBase/postCode.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
declare var $: any;

@Component({
  selector: 'app-create-freight-forwarder',
  templateUrl: './create-freight-forwarder.component.html',
  styleUrls: ['./create-freight-forwarder.component.css']
})


export class CreateFreightForwarderComponent<t, k> implements OnInit {
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
  note: any;
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
  emailList = [];
  suburb: any;
  mostrarSelect: boolean;
  mostrarcodigo: boolean = false;
  itemsPages: number = 5;
  idFreigh: any;
  maxiCaracter = 50;
  contador = 0;
  constructor(public maestros: DatabaseService, public _PosService: PostCodeService,  private activatedRoute: ActivatedRoute,private spinner: NgxSpinnerService) {
    
    this.activatedRoute.params
    .subscribe(
      (Params) => {
        this.idFreigh = Params['id'];

        if (this.idFreigh == 0) {

        } else {
          this.spinner.show();
          this.getFreigh(this.idFreigh);
        }
      }
    );

    this.parameterPostCode = {
      idCodigoPostal: 0,
      codigo: "",
      descripcion: "",
      idCiudad: 0,
    }
    // this._PosService.getCodigoPostal()

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

    this.parameterPostCode = {
      idCodigoPostal: 0,
      codigo: "",
      descripcion: "",
      idCiudad: 0,
    }
  }
  onKey(value: any) {
    this.open = true
  }
  onInputChanged(event){
    this.contador = event.length;
    console.log(event.length)
  }

  initvalue(): void {

    this.maestros.getPais(this.parameterPais, 'GET').subscribe((citi) => {
      this.paises = citi.paises;
    });

  }

  getFreigh(id){
   
    this.parameterFreight = {
      idTransporte: parseInt(id),
      descripcion: "",
      direccion: "",
      direccion2: "",
      idCiudad: 0,
      contacto: "",
      telefono: "",
      codigoPostal: "",
      correoClienteServicio: "",
      correoOperador: "",
      correoContabilidad: "",
      note: "",
    }
     this.maestros.getTransitario(this.parameterFreight, 'GET').subscribe((freig) => {
      this.editar(freig.transportes);
      // this.citiessearch = freig.transportes;
      // this.citiessearch.reverse()
      // this.searchfreight = freig.transportes;
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
    this.emailCustomerService = unitEmail;
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

  customSearchFn(term) {
    if (term.target.value.length > 2) {
      this.loading = true;
      this._PosService.getPostCodeSearch(term.target.value).subscribe((result) => {
        // this.postcodLISTA = result;
        this.validarItemsSearch(result)

      })

    }
  }

  actionExecuted(event): void {
    switch (event.description) {
      case "Save":
        this.SaveCity();
        break;

      case "Cancel":
        location.reload()
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
      if (this.idFreigh == 0) {
        this.parameterFreight = {
          idTransporte: 0,
          descripcion: this.descripcion,
          direccion: this.calleuno,
          direccion2: this.calledos,
          idCiudad: parseInt(this.nameCiudad),
          contacto: this.contac,
          telefono: this.phone,
          correoClienteServicio: this.emailCustomerService,
          correoOperador: this.emailOperator,
          correoContabilidad: this.emailAccounting,
          codigoPostal: this.postCodestr.toString(),
          observaciones: this.note
        }
  
        this.maestros.getTransitario(this.parameterFreight, 'INS').subscribe((marc) => {
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
      } else{
        this.EditCity(this.idFreigh);
      }
     
    } else {
      Swal.fire(
        'error!',
        'Required fields are mandatory!',
        'error'
      )
    }

  }

  cancel() {
    this.descripcion = ''
    this.calleuno = ''
    this.calledos = ''
    this.city = ''
    this.contac = ''
    this.phone = ''
    this.emailCustomerService = ''
    this.emailOperator = ''
    this.emailAccounting = ''
    this.state = ''
    this.postCode = ''
    this.countryName = ''
    this.nameCiudad = ''


  }

  EditCity(id): void {
    this.parameterFreight = {
      idTransporte: parseInt(id),
      descripcion: this.descripcion,
      direccion: this.calleuno,
      direccion2: this.calledos,
      idCiudad: parseInt(this.nameCiudad),
      contacto: this.contac,
      telefono: this.phone,
      correoClienteServicio: this.emailCustomerService,
      correoOperador: this.emailOperator,
      correoContabilidad: this.emailAccounting,
      codigoPostal: this.postCodestr.toString(),
      observaciones: this.note
    }

    this.maestros.getTransitario(this.parameterFreight, 'UPD').subscribe((marc) => {
       Swal.fire({
            title: 'Update Correct!',
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
  }

  validarItemsSea(inven) {
    this.cargarCiudad();

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
  editar(datos) {
    
    this.id = datos[0].idTransporte;
    this.descripcion = datos[0].descripcion;
    this.calleuno = datos[0].direccion
    this.calledos = datos[0].direccion2
    this.city = datos[0].idCiudad
    this.contac = datos[0].contacto
    this.phone = datos[0].telefono
    this.postCode = datos[0].codigoPostal
    this.emailCustomerService = datos[0].correoClienteServicio
    this.emailOperator = datos[0].correoOperador
    this.emailAccounting = datos[0].correoContabilidad
    this.note = datos[0].observaciones

    //this.infoEditPost(this.city);
    this.validarpostedit(datos[0].codigoPostal);
  }


  validarpostedit(event) {
    this.parameterPostCode = {
      idCodigoPostal: parseInt(event),
      codigo: "",
      descripcion: "",
      idCiudad: 0,
    }

    this.maestros.getCodigoPostal(this.parameterPostCode, 'GET').subscribe((post) => {
      this.posCodeList = post.codigosPostales;
      this.validarItemsSea(this.posCodeList);

    });

    // this._PosService.getPostCodeSearch(event).subscribe((result) => {
    //   this.validarItemsSearch(result)
    //   this.open = true
    // })
  }

  infoEditPost(event) {

    var infos = this.postcodLISTA.filter(function (post) {
      return post.idCiudad == event;
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

}
