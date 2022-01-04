import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/shared/services/dataBase/database.service';
import { PostCodeService } from 'src/app/shared/services/dataBase/postCode.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
declare var $: any;
@Component({
  selector: 'app-create-storage-area',
  templateUrl: './create-storage-area.component.html',
  styleUrls: ['./create-storage-area.component.css']
})


export class CreateStorageAreaComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  parameterWineries: any;
  parameterAlmacen: any;
  parameterCiudad: any;
  parameterPostCode: any;
  almacenListSearch: any;
  almacenList: any;
  searchAlmacen: any[];
  articSearch: any;
  bodegas: any;
  bodegasList: any;
  posCodeList: any
  cities: any;
  code: any;
  description: any;
  contact: any;
  phone: any;
  userMail: any;
  userOperator: any;
  winierie: any;
  city: any;
  estado = '1';
  observation: any;
  id: any;
  mostrar: boolean = false;
  nameCiudad: any;
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
  parameterPais: any;
  pagination: number = 1;
  postCodelist: any;
  postcodLISTA: any;
  poListCod: any
  selectPost: boolean = true;
  citieslist: any;
  postLISTA: any;
  open: boolean = false
  postCodestr: any;
  ciudad: any;
  loading = false;
  codigoPostalBuffer = [];
  bufferSize = 50;
  numberOfItemsFromEndBeforeFetchingMore = 10;
  emailList: string[];

  suburb: any;
  mostrarSelect: boolean;
  mostrarcodigo: boolean = false;
  idStor:any;
  constructor(public maestros: DatabaseService, public _PosService: PostCodeService, private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.activatedRoute.params
      .subscribe(
        (Params) => {
          this.idStor = Params['id'];
          
          if (this.idStor ==  0) {
            
          } else{
            this.spinner.show();
            this.EditGet();
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
    this.initvalue();
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
    this.maestros.getPais(this.parameterPais, 'GET').subscribe((citi) => {
      this.paises = citi.paises;
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

    this.parameterWineries = {
      idBodega: 0,
      codigo: "",
      descripcion: "",
      observaciones: "",
      contacto: "",
      telefono: "",
      idCentroDistribucion: 0,
      idUsuarioModificacion: 0,
      fechaModificacion: "2021-09-29T21:44:06.112Z",
      estado: ""
    }

    this.parameterAlmacen = {
      idAlmacen: 0,
      codigo: "",
      descripcion: "",
      observaciones: "",
      contacto: "",
      telefono: "",
      idBodega: 0,
      correoUsuario: "",
      correoOperador: "",
      idCiudad: 0,
      idUsuarioModificacion: 0,
      fechaModificacion: "2021-09-30T12:46:39.127Z",
      estado: "",
      codigoPostal: ""
    }


    this.parameterPostCode = {
      idCodigoPostal: 0,
      codigo: "",
      descripcion: "",
      idCiudad: 0,
    }
  }

  initvalue(): void {

    this.maestros.getAlmacen(this.parameterAlmacen, 'GET').subscribe((alma) => {
      this.almacenListSearch = alma.almacenes;
      this.searchAlmacen = alma.almacenes;

    });

    this.maestros.getBodega(this.parameterWineries, 'GET').subscribe((bodeg) => {
      this.bodegas = bodeg.bodegas;
    });

  }

  EditGet() {
    this.parameterAlmacen = {
      idAlmacen: parseInt(this.idStor),
      codigo: "",
      descripcion: "",
      observaciones: "",
      contacto: "",
      telefono: "",
      idBodega: 0,
      correoUsuario: "",
      correoOperador: "",
      idCiudad: 0,
      idUsuarioModificacion: 0,
      fechaModificacion: "2021-09-30T12:46:39.127Z",
      estado: "",
      codigoPostal: ""
    }
    this.maestros.getAlmacen(this.parameterAlmacen, 'GET').subscribe((alma) => {
      this.almacenListSearch = alma.almacenes;
      this.searchAlmacen = alma.almacenes;
      this.editar(this.almacenListSearch);
    });
  }

  onKey(value: any) {
    this.open = true
  }

  actionExecuted(event): void {
    switch (event.description) {
      case "folder_open":
        // this.abrirArticulo(paramevents.id);
        break;

      case "Save":
        this.SavewareHouse();
        break;
        case "Cancel":
          location.reload();
          break;

      default:
        throw new Error(`No existe la acción ${event.action} en la bandeja`);
    }

  }

  cancel(): void {
    this.code = ''
    this.description = ''
    this.observation = ''
    this.contact = ''
    this.phone = ''
    this.winierie = ''
    this.userMail = ''
    this.userOperator = ''
    this.city = ''
    this.estado = ''
    this.nameCiudad = ''
    this.postCode = ''
    this.countryName = ''
    this.state = ''
  }

  SavewareHouse(): void {
    if (this.idStor == 0) {
      if (this.validarEnvioAGuardar()) {
        this.parameterAlmacen = {
          idAlmacen: 0,
          codigo: this.code,
          descripcion: this.description,
          observaciones: this.observation,
          contacto: this.contact,
          telefono: this.phone,
          idBodega: parseInt(this.winierie),
          correoUsuario: this.userMail,
          correoOperador: this.userOperator,
          idCiudad: parseInt(this.nameCiudad),
          idUsuarioModificacion: 61,
          fechaModificacion: "2021-09-30T12:46:39.127Z",
          estado: this.estado,
          codigoPostal: this.postCodestr.toString(),
        }
  
        this.maestros.getAlmacen(this.parameterAlmacen, 'INS').subscribe((marc) => {
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
  
        });
      } else {
        Swal.fire(
          'error!',
          'Required fields are mandatory!',
          'error'
        )
      }
    } else{
      this.EditWareHouse(this.idStor)
    }

  }

  EditWareHouse(id): void {
    if (this.validarEnvioAGuardar()) {
      this.parameterAlmacen = {
        idAlmacen: parseInt(id),
        codigo: this.code,
        descripcion: this.description,
        observaciones: this.observation,
        contacto: this.contact,
        telefono: this.phone,
        idBodega: parseInt(this.winierie),
        correoUsuario: this.userMail,
        correoOperador: this.userOperator,
        idCiudad: parseInt(this.nameCiudad),
        idUsuarioModificacion: 61,
        fechaModificacion: "2021-09-30T12:46:39.127Z",
        estado: this.estado,
        codigoPostal: this.postCodestr.toString(),
      }
      this.maestros.getAlmacen(this.parameterAlmacen, 'UPD').subscribe((marc) => {

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
      this.almacenListSearch;
      // this.MensajeAdvertenciaOut.emit('Debe digitar mas de 3 digitos.');
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
    this.userMail = unitEmail;
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

  searchIntoData(datos) {
    //  this.searchAlmacen = this.almacenListSearch;
    let searchTerm = datos;
    if (!searchTerm) {

    }
    if (searchTerm && searchTerm.trim() != "") {
      this.almacenListSearch = this.searchAlmacen.filter((item) => {

        return (
          item.codigo.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1 || (item.contacto.toLowerCase().indexOf(searchTerm.toLowerCase()) >
            -1) || (item.descripcion.toLowerCase().indexOf(searchTerm.toLowerCase()) >
              -1) || (item.correoUsuario.toLowerCase().indexOf(searchTerm.toLowerCase()) >
                -1) || (item.correoOperador.toLowerCase().indexOf(searchTerm.toLowerCase()) >
                  -1)
        )
      });

      if (this.almacenListSearch.length == 0) {
        this.mostrar = true;
        this.returnList = true;
      } else {
        this.mostrar = false;
        this.searclist = false;
        this.returnList = true;
      }
      this.articSearch = "";
    }
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

    if (this.phone == undefined || this.phone == "") {

      return false;
    }

    return true;

  }

  limpiar() {
    this.almacenListSearch = this.searchAlmacen;
    this.searclist = true;
    this.returnList = false;
    this.mostrar = false;
  }

  borrar(datos) {
    this.parameterAlmacen = {
      idAlmacen: datos.idAlmacen,
      codigo: datos.codigo,
      descripcion: datos.descripcion,
      observaciones: datos.observaciones,
      contacto: datos.contacto,
      telefono: datos.telefono,
      idBodega: datos.idBodega,
      correoUsuario: datos.correoUsuario,
      correoOperador: datos.correoOperador,
      idCiudad: datos.idCiudad,
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
        this.maestros.getAlmacen(this.parameterAlmacen, 'DEL').subscribe((marc) => {
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
   this.cargarCiudad();
    this.id = datos[0].idAlmacen;
    this.code = datos[0].codigo;
    this.description = datos[0].descripcion;
    this.observation = datos[0].observaciones;
    this.contact = datos[0].contacto;
    this.phone = datos[0].telefono;
    this.winierie = datos[0].idBodega;
    this.userMail = datos[0].correoUsuario;
    this.userOperator = datos[0].correoOperador;
    this.city = datos[0].idCiudad;
    this.postCode = datos[0].codigoPostal;
    this.estado = datos[0].estado;
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
