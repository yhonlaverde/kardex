import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticlesService } from 'src/app/shared/services/articles/articles.service';
import { DocumentoService } from 'src/app/shared/services/articles/documento.service';
import { MaestrosService } from 'src/app/shared/services/articles/maestros.service';
import { LoginService } from 'src/app/shared/services/auth/login.service';
import { DatabaseService } from 'src/app/shared/services/dataBase/database.service';
import { DataInventory } from 'src/data/baseData/dataInventory/dataInventory';
import { Articulos } from 'src/data/modelos/controles/articulos';
import { IAction } from 'src/data/modelos/controles/IAction';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-edit-container',
  templateUrl: './edit-container.component.html',
  styleUrls: ['./edit-container.component.scss']
})


export class EditContainerComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  selectedImage: any;
  imagen: any;
  articSearch;
  selectedFiles: FileList;
  //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  progressInfo = []
  message = '';
  fileName = "";
  articles;
  nombreItem;
  reservarbodega: any
  dataChanged: any;
  unitValue;
  detalleProduct;
  valuedContador: any[];
  tablaConItems: boolean = false;
  ocultarInputs: boolean = false;
  fileInfos: Observable<any>;
  statusFormDo: any;
  estado;
  numeroDocumento: any;
  contenedorCofinet: any;
  contrato: any;
  contenedor: any;
  idProveedor: any;
  fechaSalida: any;
  fechaLlegada: any;
  documentoReferencia: any;
  actividad: any;
  observacion: any;
  estadoEnvio: any;
  documentos: any;
  cuarentena: any;
  fechaInspeccio: any;
  retencionesFrontera: any;
  pesoBruto: any;
  parameterSupplier;
  supplierListSearch;
  idCompra;
  parameteVariedad;
  parameterOrigin;
  subessearch;
  originlist;
  idAlmacen;
  tableHeader = ['Name', 'Warehouse', '# Lot', 'Quantity', 'Available', 'Reserve', 'Transit', 'Price Unit', 'Total', 'Origin'];
  Warehouse: boolean = true;
  Name: boolean = true;
  Class: boolean = true;
  Lot: boolean = true;
  Transit: boolean = true;
  Reserved: boolean = true;
  Total: boolean = true;
  Available: boolean = true;
  Action: boolean = true;
  docu = 'doc';
  Activartodos: boolean = false;
  ocultarAcciones: boolean = false;
  documentNo: any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private datainventory: DataInventory,
    public maestros: DatabaseService,
    public inventario: ArticlesService,
    public docm: DocumentoService,
    public loginservice: LoginService,
    public maestr: MaestrosService,) {
    this.activatedRoute.params
      .subscribe(
        (Params) => {
          this.idCompra = Params['id'];
          this.getCompra();
        }
      );
    this.valuedContador = [];
    this.detalleProduct = [];
    this.statusFormDo = "PENDING"
    this.action = [
      {
        description: "New",
        icon: "mdi mdi-open-in-new",
      },
      {
        description: "Save",
        icon: "mdi mdi-content-save",
      },
       {
        description: "In Transit",
        icon: "mdi mdi-water",
      },
      {
        description: "Approve",
        icon: "mdi mdi-checkerboard",
      },
      {
        description: "Annul",
        icon: "mdi mdi-stop",
      },
      // {
      //   description: "To print",
      //   icon: "mdi mdi-cloud-print",
      // },
      {
        description: "Return",
        icon: "mdi mdi-keyboard-return",
      },
    ];
    this.parameterSupplier = {
      idProveedor: 0,
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
      fechaModificacion: "2021-09-30T14:19:54.114Z",
      estado: ""
    }
  }

  ngOnInit(): void {
    this.parameteVariedad = {
      idVariedadItem: 0,
      codigo: "",
      descripcion: ""
    }
    this.parameterOrigin = {
      idOrigenItem: 0,
      codigo: "",
      descripcion: ""
    }
    this.maestr.getVariedad(this.parameteVariedad, 'GET').subscribe((sub) => {
      this.subessearch = sub.variedadesItem;
    });

    this.maestr.getOrigin(this.parameterOrigin, 'GET').subscribe((sub) => {
      this.originlist = sub.origenesItem;
    });
    $('a[download]').each(function () {
      var $a = $(this),
        fileUrl = $a.attr('href');

      $a.attr('href', 'data:application/octet-stream,' + encodeURIComponent(fileUrl));
    });

    this.maestros.getProveedor(this.parameterSupplier, 'GET').subscribe((supplier) => {

      this.supplierListSearch = supplier.proveedores;
    });

    this.reservarbodega = JSON.parse(this.loginservice.getTokenJeraquia());
    var unidod = "";
    // var bodega = "";
    // var centro = ""
    this.reservarbodega.map((unid) => {

      unidod += unid.idAlmacen + ","
    })

    this.idAlmacen = unidod;
    $('.collapse').on('hidden.bs.collapse', function () {
      // read the data-default value
      var defaultDiv = $($(this).data("parent")).data("default");
      // show the default panel
      $('.collapse').eq(defaultDiv - 1).collapsed(); ('show');
    })
  }

  actionExecuted(event): void {
    switch (event.description) {
      case "folder_open":
        // this.abrirArticulo(paramevents.id);
        break;

      case "Annul":
        this.anularDocumento()
        break;

      case "Approve":
        this.aprobarDocumento();
        break;
        case "In Transit":
          this.inTransit();
          break;
      case "Return":
        location.reload()
        break;

      case "Save":
        this.GuardarCompra();
        break;

      default:
        throw new Error(`No existe la acción ${event.action} en la bandeja`);
    }

  }

  GuardarCompra() {
    this.valuedContador.map((articCont) => {
      this.detalleProduct.push({
        idReferenciaOrdenCompra: articCont.idReferenciaDocumentoCompra,
        idOrdenCompra: parseInt(this.idCompra),
        idItem: parseInt(articCont.idItem),
        cantidad: parseInt(articCont.cantidad),
        valorUnitario: parseInt(articCont.valorUnitario),
        fechaVencimiento: "2021-10-12T20:58:42.846Z",
        posicion: "",
        idAlmacen: parseInt(articCont.StorageArea),
        lote: articCont.lote,
        disponible: parseInt(articCont.cantidad),
        reserva: parseInt(articCont.reserva),
        transito: parseInt(articCont.transito),
        sku: articCont.sku,
        item: articCont.item,
        proceso: articCont.proceso,
        clasificacion: articCont.clasificacion,
        origen: articCont.origen,
        almacen: articCont.almacen,
        bodega: articCont.bodega,
      });
    });
    const parameter = {
      idOrdenCompra: parseInt(this.idCompra),
      numeroDocumento: this.documentNo,
      estado: this.estado,
      documentoReferencia: this.documentoReferencia,
      idProveedor: this.idProveedor,
      actividad: this.actividad,
      observacion: this.observacion,
      idUsuarioCreacion: 61,
      idUsuarioModificacion: 61,
      fechaCreacion: "2021-12-14T19:52:13.006Z",
      fechaModificacion: "2021-12-14T19:52:13.006Z",
      contenedorCofinet: this.contenedorCofinet,
      contrato: this.contrato,
      contenedor: this.contenedor,
      fechaSalida: this.fechaSalida,
      fechaLlegada: this.fechaLlegada,
      estadoEnvio: this.estadoEnvio,
      documentos: this.documentos,
      cuarentena: this.cuarentena,
      fechaInspeccion: this.fechaInspeccio,
      retencionesFrontera: this.retencionesFrontera,
      pesoBruto: this.pesoBruto,
      detalle: this.detalleProduct
    }



    this.docm.ordenCompra(parameter, 'UPD').subscribe((result) => {
      // this.idDocumentoBodega = result.documento[0].idDocumentoBodega;
      this.validarEstadoString(this.estado);

      Swal.fire({
        title: 'Save Correct!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: 'rgb(35 80 105)',
        cancelButtonColor: '#a5dc86',
        confirmButtonText: 'Back To List!',
        cancelButtonText:'Ok',
        denyButtonText: `Ok`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          location.reload()
        } else if (result.isDenied) {

        }
      })
      // location.reload()
    })
  }

  inTransit() {
    if (this.statusFormDo == "CANCELED") {
      Swal.fire(
        'Information!',
        'you cannot approve an already canceled document!',
        'info'
      )
    } else {
    
      Swal.fire({
        title: 'You are sure to put the container in transit?',
        showDenyButton: true,
        showCancelButton: true,
        icon: 'info',
         cancelButtonText:'Ok',
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const parameters = {
            idOrdenCompra: parseInt(this.idCompra),
            idUsuario: 61
          }
          this.docm.getInTransit(parameters).subscribe((resu) => {
            if (resu.estado[0].msgId === -1) {
              Swal.fire(
                'Information!',
                resu.estado[0].msgStr,
                'info'
              )
            } else {
              var action = {  description: "Save", icon: "mdi mdi-content-save", } 
              var actions = this.action.filter(function (artic) {
                return artic.description !== action.description;
              });
      
              this.action = actions;
              Swal.fire({
                title: resu.estado[0].msgStr,
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: 'rgb(35 80 105)',
                cancelButtonColor: '#a5dc86',
                confirmButtonText: 'Back To List!',
                cancelButtonText:'Ok',
                denyButtonText: `Ok`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  location.reload()
                } else if (result.isDenied) {
                 
                }
              })
            }
    
    
            // location.reload()
          })
        } else if (result.isDenied) {
          Swal.fire('Container not In Transit', '', 'info')
        }
      })
    }

  }

  aprobarDocumento() {
    if (this.statusFormDo == "CANCELED") {
      Swal.fire(
        'Information!',
        'you cannot approve an already canceled document!',
        'info'
      )
    } else {
      Swal.fire({
        title: 'You are sure to approve the container?',
        icon: 'info',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText:'Ok',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const parameters = {
            idOrdenCompra: parseInt(this.documentNo),
            idUsuario: 61
          }
          this.docm.getAprobarCompra(parameters).subscribe((resu) => {
            if (resu.estado[0].msgId === -1) {
              Swal.fire(
                'Information!',
                resu.estado[0].msgStr,
                'info'
              )
            } else {
              Swal.fire({
                title: resu.estado[0].msgStr,
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: 'rgb(35 80 105)',
                cancelButtonColor: '#a5dc86',
                confirmButtonText: 'Back To List!',
                cancelButtonText:'Ok',
                denyButtonText: `Ok`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  location.reload()
                } else if (result.isDenied) {
    
                }
              })
            }
    
    
            // location.reload()
          })
        } else if (result.isDenied) {
          Swal.fire('Container not In Transit', '', 'info')
        }
      })
     
    }

  }

  anularDocumento() {
      Swal.fire({
        title: 'You are sure to annul the container?',
        showDenyButton: true,
        showCancelButton: true,
        icon: 'info',
        cancelButtonText:'Ok',
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const parameters = {
            idOrdenCompra: parseInt(this.documentNo),
            idUsuario: 61
          }
          this.docm.getAnularCompra(parameters).subscribe((result) => {
            Swal.fire({
              title: result.estado[0].msgStr,
              icon: 'success',
              showCancelButton: true,
              confirmButtonColor: 'rgb(35 80 105)',
              cancelButtonColor: '#a5dc86',
              confirmButtonText: 'Back To List!',
              cancelButtonText:'Ok',
              denyButtonText: `Ok`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                location.reload()
              } else if (result.isDenied) {
    
              }
            })
            // location.reload()
          })
        } else if (result.isDenied) {
          Swal.fire('Container not In Transit', '', 'info')
        }
      })
      
    

  }

  getCompra() {
    const parameter = {
      idOrdenCompra: parseInt(this.idCompra),
      numeroDocumento: 0,
      estado: this.estado,
      documentoReferencia: this.documentoReferencia,
      idProveedor: this.idProveedor,
      actividad: this.actividad,
      observacion: this.observacion,
      idUsuarioCreacion: 61,
      idUsuarioModificacion: 61,
      fechaCreacion: "2021-12-14T19:52:13.006Z",
      fechaModificacion: "2021-12-14T19:52:13.006Z",
      contenedorCofinet: this.contenedorCofinet,
      contrato: this.contrato,
      contenedor: this.contenedor,
      fechaSalida: this.fechaSalida,
      fechaLlegada: this.fechaLlegada,
      estadoEnvio: this.estadoEnvio,
      documentos: this.documentos,
      cuarentena: this.cuarentena,
      fechaInspeccion: this.fechaInspeccio,
      retencionesFrontera: this.retencionesFrontera,
      pesoBruto: this.pesoBruto,
      detalle: []
    }
    this.docm.ordenCompra(parameter, 'GET').subscribe((result) => {


      this.tablaConItems = true;
      this.valuedContador = result.documento[0].detalle;
      this.mostrarDatos(result.documento)
      // location.reload()
    })
  }

  mostrarDatos(datos) {
    if (datos[0].estado == "2" || datos[0].estado == "3" || datos[0].estado == "4") {
      this.ocultarInputs = true;
      this.ocultarAcciones = false;
    } else {
      this.ocultarInputs = false;
      this.ocultarAcciones = true;
    }

    this.documentNo = datos[0].numeroDocumento;
    this.estado = datos[0].estado
    this.documentoReferencia = datos[0].documentoReferencia,
      this.idProveedor = datos[0].idProveedor
    this.actividad = datos[0].actividad
    this.observacion = datos[0].observacion


    this.contenedorCofinet = datos[0].contenedorCofinet
    this.contrato = datos[0].contrato
    this.contenedor = datos[0].contenedor
    this.fechaSalida = datos[0].fechaSalida
    this.fechaLlegada = datos[0].fechaLlegada
    this.estadoEnvio = datos[0].estadoEnvio
    this.documentos = datos[0].documentos
    this.cuarentena = datos[0].cuarentena
    this.fechaInspeccio = datos[0].fechaInspecc
    this.retencionesFrontera = datos[0].retencionesFrontera
    this.pesoBruto = datos[0].pesoBruto
    // this.idITem =  datos[0].detalle[0].idItem
    this.SetArticulos(datos[0].detalle);

    this.validarEstadoString(this.estado)
  }

  SetArticulos(idItem): void {

    idItem.forEach(element => {

      const parameters: Articulos = {
        idItem: parseInt(element.idItem),
        sku: "",
        descripcion: "",
        alto: 0,
        ancho: 0,
        codigoInternoPMI: "",
        ean: "",
        embalaje: 0,
        estado: "",
        largo: 0,
        fechaModificacion: "2021-09-22T20:21:20.149Z",
        idClasificacion: 0,
        idMarca: 0,
        idUsuarioModificacion: 0,
        imagen: '',
        observacion: "",
        patronEstiba: 0,
        peso: 0,
        posicionPrincipal: "",
        posiciones: [
        ],
        unidadesEmpaque: [
        ],
        valorUnitario: 0
      }

      this.setArticles(parameters);
    });

  }

  setArticles(datos) {

    this.inventario.GuardarArticulo(datos, 'GET').subscribe((arti) => {
      console.log('artciu', arti.items);
      // this.getMostrar(arti.items)
      this.validarItemsEditable(arti.items);
      //  location.reload()
    })
  }

  validarItemsEditable(inven) {
 
    // this.valuedContador = [];

    const unicos = [];
    inven.forEach(element => {


      this.valuedContador.map((arti) => {
      

        if (arti.idItem == element.idItem) {
      
          var totales = parseInt(arti.cantidad) * parseInt(arti.valorUnitario);
          arti["totales"] = `${totales}`;
          // arti["precioPromedio"] = `${promedio}`;
          arti["StorageArea"] = `${arti.idAlmacen}`;


          var variedad = this.subessearch.filter(function (artic) {
            return artic.idVariedadItem == element.idVariedadItem;
          });
          var origen = this.originlist.filter(function (origi) {
            return origi.idOrigenItem == element.idOrigenItem;
          });
          arti['variedad'] = `${variedad[0]["descripcion"]}`;
          arti['origen'] = `${origen[0]["descripcion"]}`;
          arti["editable"] = `${false}`;

          arti["descripcion"] = `${inven[0]["descripcion"]}`;
          arti['observacion'] = `${inven[0]["observacion"]}`;
          arti['IdItem'] = `${element.idItem}`;
          arti['EAN'] = `${inven[0]["ean"]}`;




          this.valuedContador.push(arti);
          // }
        }

      })
    });
    for (var i = 0; i < this.valuedContador.length; i++) {

      const elemento = this.valuedContador[i];

      if (!unicos.includes(this.valuedContador[i])) {
        unicos.push(elemento);
      }
    }
    this.valuedContador = unicos;
    console.log('mostrar', this.valuedContador)
  }

  imgAccordion(event) {
    event.target.files.length == 1 ? this.fileName = event.target.files[0].name : this.fileName = event.target.files.length + " archivos";
    this.selectedFiles = event.target.files;

  }

  deleteFile(filename) {

  }

  filterProduct() {
    $('#filterModal').modal('show')
  }

  filter() {
    const parameter = {
      idBandeja: '3',
      busqueda: this.articSearch
    }

    this.inventario.searchArticles(parameter).subscribe((res) => {

      this.validarItemsSearch(res.data);
    });
  }


  checkPush(ev) {

    if (!ev.target.checked) {
      const valued = this.articles.filter(x => x.almacen == ev.target.value)
      valued.map((contad) => {
        var indice = this.valuedContador.indexOf(contad.almacen);
        this.valuedContador.splice(indice, 1);
      });
    } else {
      const valued = this.articles.filter(x => x.almacen == ev.target.value)
      valued.map((contad) => {
        this.valuedContador.push(
          contad
        );
      });

    }

  }

  addDetalle(datos, almancen) {

    const parameter = {
      idUsuario: 61,
      IdItem: parseInt(datos.idItem),
      idAlmacen: parseInt(almancen)
    }
    this.inventario.searchBodegaItem(parameter).subscribe((res) => {
      console.log(res)
      const invent = []
      this.valuedContador = [];
      for (const i of Object["values"](res.inventario)) {
  
        i["StorageArea"] = `${almancen}`;
        i['loteNum'] = `${""}`;
  
        invent.push(i);
      }
      const unicos = [];
      for (var i = 0; i < invent.length; i++) {

        const elemento = invent[i];
  
        if (!unicos.includes(invent[i])) {
          unicos.push(elemento);
        }
      }
      this.valuedContador = unicos;

      // this.articles = res.inventario
       console.log(this.valuedContador);
    });

    

  }

  validarItemsadd(inven) {
    // this.valuedContador = [];

    const unicos = [];

    this.valuedContador.map((arti) => {
      if (arti.IdItem == inven.IdItem) {
        arti.editable = "";
        arti.total = parseInt(inven.Quantity) * parseInt(inven.valorUnitario);
        this.valuedContador.push(
          arti
        );
      }
    })

    for (var i = 0; i < this.valuedContador.length; i++) {

      const elemento = this.valuedContador[i];

      if (!unicos.includes(this.valuedContador[i])) {
        unicos.push(elemento);
      }
    }
    this.valuedContador = unicos;
    // for (const i of Object["values"](inven)) {
    //   // i["editable"] = `${""}`;
    //   // this.valuedContador.push(i);
    // }

  }


  validarItemsSearch(inven) {
    this.articles = [];
    for (const i of Object["values"](inven)) {
      // const storage = this.reservarbodega.filter(x => x.almacen == i['almacen'])
      // console.log()

      // i["StorageArea"] = `${storage[0].idAlmacen}`;
      i["idItem"] = `${i['IdItem']}`;
      i['loteNum'] = `${""}`;
      i["item"] = `${i["Descripción"]}`;
      i["valorUnitario"] = `${i["Costo Unitario"]}`;
      i["classification"] = `${i["Clasificación"]}`;
      i["ProcesoItem"] = `${i["Proceso Item"]}`;
      i["SubCategoria"] = `${i["SubCategoría"]}`;
      i['origen'] = `${i["Origen"]}`;
      i["precioPromedio"] = `${i["Precio Promedio"]}`;
      this.articles.push(i);
    }

    console.log(this.articles)

  }

  onInputChanged(value: string, rowIndex: number, propertyKey: string): void {
    // this.quantity = value;

    this.dataChanged = [];
    const newValue = this.valuedContador.map((row, index) => {
      return index !== rowIndex ? row : { ...row, [propertyKey]: value }
    })
    this.dataChanged.push(newValue);

    // this.validarItemsadd(this.dataChanged)
  }
  onInputChangedStorage(value: string, rowIndex: number, propertyKey: string): void {
    // this.quantity = value;
    this.dataChanged = [];
    
    const newValue = this.valuedContador.map((row, index) => {
      return index !== rowIndex ? row : { ...row, [propertyKey]: value }
    })
    this.dataChanged.push(newValue);

    
    // this.validarItemsadd(this.dataChanged)
  }

  AddProduct(): void {
    // this.validarItemsEditable(this.valuedContador);
    $('#filterModal').modal('hide')
    this.articles = [];
    this.articSearch = "";
    this.tablaConItems = true;

  }

  deleteArticulo(idArti): void {
    const array = []
    for (var i = 0; i < this.valuedContador.length; i++) {
      this.valuedContador[i]['idReal'] = i
      array.push(this.valuedContador[i])
    }
    var articulo = array.filter(function (artic) {
      return artic.idReal !== idArti;
    });
    this.valuedContador = articulo;
  }

  validar(inven) {

    const unicos = [];

    this.dataChanged[0].map((arti) => {

      if (arti.IdItem == inven.IdItem) {

        if (arti.idDocumentoBodega) {

        } else {
          const storage = this.reservarbodega.filter(x => x.almacen == arti['almacen'])

          arti["StorageArea"] = `${storage[0].idAlmacen}`;

        }


        arti.editable = "";
        arti.totales = parseInt(arti.cantidad) * parseInt(arti.valorUnitario);
        arti.IdItem = inven.idItem;


        this.dataChanged[0].push(
          arti
        );
      }
    })

    for (var i = 0; i < this.dataChanged[0].length; i++) {

      const elemento = this.dataChanged[0][i];

      if (!unicos.includes(this.dataChanged[0][i])) {
        unicos.push(elemento);
      }
    }
    this.dataChanged[0] = unicos;
    this.valuedContador = this.dataChanged[0];


    // for (const i of Object["values"](inven)) {
    //   // i["editable"] = `${""}`;
    //   // this.valuedContador.push(i);
    // }

  }

  validarEstadoString(status) {
    if (status == '1') {
      this.statusFormDo = "PENDING"
      var action = {  description: "Approve", icon: "mdi mdi-checkerboard"} 
      var actions = this.action.filter(function (artic) {
        return artic.description !== action.description;
      });

      this.action = actions;
    } else if (status == '2') {
      this.statusFormDo = "APPROVED"
        var action = {  description: "Save", icon: "mdi mdi-content-save", } 
        var actions = this.action.filter(function (artic) {
          return artic.description !== action.description;
        });
       
        this.action = actions;

        var action = {  description: "In Transit", icon: "mdi mdi-water",} 
        var actions = this.action.filter(function (artic) {
          return artic.description !== action.description;
        });

        this.action = actions;

        var action = {  description: "Approve", icon: "mdi mdi-checkerboard"} 
        var actions = this.action.filter(function (artic) {
          return artic.description !== action.description;
        });

        this.action = actions;
    } else if (status == '3') {
      this.statusFormDo = "InTransit"
        var action = {  description: "Save", icon: "mdi mdi-content-save", } 
        var actions = this.action.filter(function (artic) {
          return artic.description !== action.description;
        });

        this.action = actions;

        var action = {   description: "In Transit",  icon: "mdi mdi-water",} 
        var actions = this.action.filter(function (artic) {
          return artic.description !== action.description;
        });
        this.action = actions;
    } else {
      this.statusFormDo = "CANCELED"
      var action = {  description: "Save", icon: "mdi mdi-content-save", } 
      var actions = this.action.filter(function (artic) {
        return artic.description !== action.description;
      });

      this.action = actions;

      var action = {  description: "Approve", icon: "mdi mdi-checkerboard"} 
      var actions = this.action.filter(function (artic) {
        return artic.description !== action.description;
      });

      this.action = actions;

      var action = {  description: "Annul",  icon: "mdi mdi-stop"} 
      var actions = this.action.filter(function (artic) {
        return artic.description !== action.description;
      });

      this.action = actions;

      var action = {   description: "In Transit",  icon: "mdi mdi-water",} 
      var actions = this.action.filter(function (artic) {
        return artic.description !== action.description;
      });
      this.action = actions;
    }
  }
}
