import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ArticlesService } from 'src/app/shared/services/articles/articles.service';
import { DocumentoService } from 'src/app/shared/services/articles/documento.service';
import { MaestrosService } from 'src/app/shared/services/articles/maestros.service';
import { LoginService } from 'src/app/shared/services/auth/login.service';
import { DatabaseService } from 'src/app/shared/services/dataBase/database.service';
import { Articulos } from 'src/data/modelos/controles/articulos';
import { IAction } from 'src/data/modelos/controles/IAction';
import Swal from 'sweetalert2';
import { DataInventory } from '../../../data/baseData/dataInventory/dataInventory'
declare var $: any;
@Component({
  selector: 'app-editar-reservation',
  templateUrl: './editar-reservation.component.html',
  styleUrls: ['./editar-reservation.component.scss']
})

export class EditarReservationComponent<t, k> implements OnInit {
  private idInventory: any;
  fields: any[];
  action: IAction<t, k>[];
  actionAdd: IAction<t, k>[];
  articles: any;
  articSearch: any;
  parameterCliente: any;
  parameterSupplier: any;
  clientListSearch: any;
  supplierListSearch: any;
  documentNo: any;
  documentRefere: any;
  supplier: any;
  customer: any;
  activity: any;
  estado: any;
  observation: any;
  reason: any;
  nombreItem: any;
  supplierSelect: any;
  customerSelect: any;
  valuedContador: any[];
  tablaConItems: boolean = false;
  detalleAcordion: boolean;
  parameterAlmacen: any;
  bodegas: any;
  bodega: any;
  quantity: any;
  inventory: any;
  unitValue: any;
  total: any;
  detalleProduct;
  tableHeader = ['Name', 'Warehouse', '# Lot', 'Quantity', 'Available', 'Reserve', 'Transit', 'Price Unit', 'Total', 'Origin'];
  idITem;
  parameterMotivo: any;
  editableForm: boolean = true;
  motivoList: any;
  idDocu: any;
  statusFormDo: any;
  dataChanged: any;
  idReferenciaDocumentoCompra: any;
  parameter: any;
  reservarbodega: any
  reservar: boolean;
  noreservar: boolean;
  ocultarInputs: boolean = false;
  ocultarAcciones: boolean;
  parameteVariedad: any;
  parameterOrigin: any
  subessearch;
  originlist;
  fechaCreacion;
  fechaModificacion;
  idAlmacen;
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
  Activartodos: boolean = true;
  CamposTabla;
  Varietal: boolean = false;
  Process: boolean = false;
  paginationCampo: number = 1;
  itemsPagescampo: number = 5;
  detalleProductList;
  constructor(
    private activatedRoute: ActivatedRoute,
    private datainventory: DataInventory,
    public maestros: DatabaseService,
    public maestr: MaestrosService,
    public inventario: ArticlesService,
    public docm: DocumentoService,
    public loginservice: LoginService,
  ) {
    this.fields = [];
    this.valuedContador = [];
    this.detalleProduct = [];
    this.detalleProductList = [];
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
    this.actionAdd = [
      {
        description: "Load Products",
        icon: "mdi mdi-folder-plus",
      }
    ]
    this.activatedRoute.params
      .subscribe(
        (Params) => {
          this.idInventory = Params['id'];
          
          this.idDocu = Params['id'];
          this.GetDocumento();

          if (this.idInventory == 2) {
            this.supplierSelect = true;
            this.customerSelect = false;
            this.detalleAcordion = true;
          } else if (this.idInventory == 6) {
            this.supplierSelect = false;
            this.customerSelect = true;
            this.detalleAcordion = false;
          } else if (this.idInventory == 12) {
            this.supplierSelect = false;
            this.customerSelect = true;
            this.detalleAcordion = false;
            this.reservar = true
            this.noreservar = false;
            this.reservarbodega = JSON.parse(this.loginservice.getTokenJeraquia());


          }
        }
      );

    this.parameterCliente = {
      idCliente: 0,
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

    this.parameterMotivo = {
      idMotivo: 0,
      codigo: "",
      descripcion: "",
      orden: 0,
      idTipoDocumento: 0
    }
  }

  ngOnInit(): void {
    this.reservarbodega = JSON.parse(this.loginservice.getTokenJeraquia());
    var unidod = "";
    // var bodega = "";
    // var centro = ""
    this.reservarbodega.map((unid) => {

      unidod += unid.idAlmacen + ","
    })

    this.idAlmacen = unidod;
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
    $('.collapse').on('hidden.bs.collapse', function () {
      // read the data-default value
      var defaultDiv = $($(this).data("parent")).data("default");
      // show the default panel
      $('.collapse').eq(defaultDiv - 1).collapsed(); ('show');
    })
    this.initvalue();
    this.getInventory();
  }

  GetDocumento() {
   
    const parameters = {
      idDocumentoBodega: parseInt(this.idDocu),
      idTipoDocumento: 0,
      numeroDocumento: 0,
      estado: "",
      documentoReferencia: "",
      idCliente: 0,
      idProveedor: 0,
      idMotivo: 0,
      actividad: "",
      observacion: "",
      idUsuarioCreacion: 0,
      idUsuarioModificacion: 0,
      fechaCreacion: "2021-11-05T14:56:28.833Z",
      fechaModificacion: "2021-11-05T14:56:28.833Z",
      detalle: []
    }
    this.docm.getDocumento(parameters, 'GET').subscribe((result) => {
      console.log('docume',result);
      if (result.documento[0].idTipoDocumento == 12) {
        this.supplierSelect = false;
        this.customerSelect = true;
        this.detalleAcordion = false;
        this.reservar = true
        this.noreservar = false;
        this.reservarbodega = JSON.parse(this.loginservice.getTokenJeraquia());

      } else {
        this.detalleAcordion = true;
        this.reservar = false
        this.noreservar = true;
      }
     
      this.tablaConItems = true;
      this.valuedContador = result.documento[0].detalle;
      this.editDocumento(result.documento)
      // this.documentNo =result.documento[0].numeroDocumento;
      //this.estado = result.documento[0].estado;

      // location.reload()
    })
  }

  cargardatos(){
    this.docm.getMotivo(this.parameterMotivo, 'GET').subscribe((sub) => {

      this.motivoList = sub.motivos.filter(x => x.idTipoDocumento == this.idInventory)

      // this.motivoList = sub.motivos;

    });
  }



  editDocumento(datos) {
    console.log(datos);
    if (datos[0].idTipoDocumento == 2) {
      this.supplierSelect = true;
      this.customerSelect = false;
    } else if (datos[0].idTipoDocumento == 6) {
      this.supplierSelect = false;
      this.customerSelect = true;
    }
    if (datos[0].estado == "2" || datos[0].estado == "4") {
      this.ocultarInputs = true;
      this.ocultarAcciones = false;
    } else {
      this.ocultarInputs = false;
      this.ocultarAcciones = true;
    }

    this.documentNo = datos[0].numeroDocumento;
    this.estado = datos[0].estado;
    this.supplier = datos[0].idProveedor
    this.customer = datos[0].idCliente
    this.documentRefere = datos[0].documentoReferencia
    this.activity = datos[0].actividad
    this.reason = datos[0].idMotivo
    this.observation = datos[0].observacion
    this.idInventory = datos[0].idTipoDocumento;
    this.fechaCreacion = datos[0].fechaCreacion
    this.fechaModificacion = datos[0].fechaModificacion
    // this.bodega = datos[0].detalle[0].idAlmacenOrigen
    // this.idITem =  datos[0].detalle[0].idItem
    this.cargardatos();
    this.SetArticulos(datos[0].detalle);
    this.quantity = datos[0].detalle[0].cantidad
    this.unitValue = datos[0].detalle[0].valorUnitario
    this.inventory = datos[0].detalle[0].posicion
    // this.bodega = datos[0].detalle[0].idAlmacenOrigen
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
      // this.getMostrar(arti.items)
      this.validarItemsEditable(arti.items);
      //  location.reload()
    })
  }

  initvalue(): void {

    this.maestros.getCliente(this.parameterCliente, 'GET').subscribe((client) => {
      this.clientListSearch = client.clientes;
    });

    this.maestros.getProveedor(this.parameterSupplier, 'GET').subscribe((supplier) => {

      this.supplierListSearch = supplier.proveedores;
    });

    this.maestros.getAlmacen(this.parameterAlmacen, 'GET').subscribe((alma) => {
      this.bodegas = alma.almacenes;
    });

   

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
      case "Return":
        location.reload()
        break;

      case "Save":
        this.GuardarDocumento();
        break;

      default:
        throw new Error(`No existe la acción ${event.action} en la bandeja`);
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
        title: 'You are sure to approve this document?',
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
            idDocumentoBodega: parseInt(this.idDocu),
            idUsuario: 61
          }
          this.docm.getAprobarDocumento(parameters).subscribe((resu) => {
            if (resu.estado[0].msgId === -1) {
              Swal.fire(
                'Information!',
                resu.estado[0].msgStr,
                'info'
              )
            } else {
              Swal.fire({
                title: 'Document Approve Correct!',
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#a5dc86',
                confirmButtonText: 'Back To List!',
         cancelButtonText:'Ok',
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
          Swal.fire('Document not approved', '', 'info')
        }
      })
     
    }

  }

  anularDocumento() {
    // if (this.statusFormDo == "APPROVED") {
    //   Swal.fire(
    //     'Information!',
    //     'you cannot void an approved document !',
    //     'info'
    //   )
    // } else {

      Swal.fire({
        title: 'You are sure to annul this document??',
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
            idDocumentoBodega: parseInt(this.idDocu),
            idUsuario: 61
          }
          this.docm.getAnularDocumento(parameters).subscribe((result) => {
            if (result.estado[0].msgId === -1) {
              Swal.fire(result.estado[0].msgStr, '', 'info')
            }
            Swal.fire({
              title: 'Document Annul Correct!',
              icon: 'success',
              showCancelButton: true,
              confirmButtonColor: 'rgb(35 80 105)',
              cancelButtonColor: '#a5dc86',
              confirmButtonText: 'Back To List!',
              cancelButtonText:'Ok',
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
          Swal.fire('Document not annul', '', 'info')
        }
      })
      
    

  }

  GuardarDocumento() {
    this.detalleProduct = [];
    const hoy = moment().format();
    if (this.validarEnvioAGuardar()) {
      if (this.valuedContador.length == 0) {
        Swal.fire(
          'Info!',
          'no details added!',
          'info'
        )
      } else {
        this.valuedContador.map((articCont) => {
          console.log('detalle',articCont)
          // if (articCont.IdItem == 0) {
          //   articCont.IdItem = articCont.idItem
          // }
          this.detalleProduct.push({
            idReferenciaDocumentoCompra: articCont.idReferenciaDocumentoCompra,
            idDocumentoBodega: parseInt(this.idInventory),
            idItem: parseInt(articCont.idItem),
            cantidad: parseInt(articCont.Quantity),
            valorUnitario: parseInt(articCont.valorUnitario),
            fechaVencimiento: '2021-10-12T20:58:42.846Z',
            posicion: '',
            idAlmacenOrigen: parseInt(articCont.StorageArea),
            idAlmacenDestino: 0,
            idReferenciaDocumentoBodegaDestino: parseInt(articCont.StorageArea),
            lote: articCont.lote,
            almacenOrigen: "",
            almancenDestino: '',
            bodegaDestino: '',
            bodegaOrigen: "",
            disponible: parseInt(articCont.cantidad),
            reserva: parseInt(articCont.reserva),
            transito: parseInt(articCont.transito),
            sku: '',
            item: articCont.item,
            proceso: articCont.proceso,
            clasificacion: articCont.clasificacion,
            origen: articCont.origen 
          });
        });

        if (this.customer == undefined) {
          this.customer = this.supplier;
          this.parameter = {
            idDocumentoBodega: parseInt(this.idDocu),
            idTipoDocumento: parseInt(this.idInventory),
            numeroDocumento: this.documentNo,
            estado: this.estado,
            documentoReferencia: this.documentRefere,
            idProveedor: parseInt(this.supplier),
            idMotivo: parseInt(this.reason),
            actividad: this.activity,
            observacion: this.observation,
            idUsuarioCreacion: 61,
            idUsuarioModificacion: 61,
            fechaCreacion: this.fechaCreacion,
            fechaModificacion: hoy,
            detalle: this.detalleProduct
          }

        } else if (this.supplier == undefined) {
          this.parameter = {
            idDocumentoBodega: parseInt(this.idDocu),
            idTipoDocumento: parseInt(this.idInventory),
            numeroDocumento: this.documentNo,
            estado: this.estado,
            documentoReferencia: this.documentRefere,
            idCliente: parseInt(this.customer),
            idMotivo: parseInt(this.reason),
            actividad: this.activity,
            observacion: this.observation,
            idUsuarioCreacion: 61,
            idUsuarioModificacion: 61,
            fechaCreacion: this.fechaCreacion,
            fechaModificacion: hoy,
            detalle: this.detalleProduct
          }
        }
        this.docm.getDocumento(this.parameter, 'UPD').subscribe((result) => {
          this.validarEstadoString(this.estado);

          Swal.fire({
            title: 'Save Correct!',
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: 'rgb(35 80 105)',
            cancelButtonColor: '#a5dc86',
            confirmButtonText: 'Back To List!',
            cancelButtonText:'Ok',
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

    } else {
      Swal.fire(
        'error!',
        'Required fields are mandatory!',
        'error'
      )
    }

  }

  validarEnvioAGuardar() {

    if (this.documentRefere == undefined) {

      return false;
    }

    if (this.activity == undefined) {

      return false;
    }


    if (this.reason == undefined) {

      return false;
    }



    return true;

  }

  validarEstadoString(status) {
    if (status == '1') {
      this.statusFormDo = "PENDING"
    } else if (status == '2') {
      this.statusFormDo = "APPROVED"

     
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
    }
  }

  filterProduct(type: string) {
    if (type === 'reserEntra') {
      if (this.validarEnvioAGuardar()) {
        $('#filterReserv').modal('show');
      } else {
        const mensaje = '¡Cannot add details, fill in fields!';
        Swal.fire('Information!', mensaje, 'info');
      }
    } else if(type === 'salida') {
      if (this.validarEnvioAGuardar()) {
        $('#filterModal').modal('show');
      } else {
        const mensaje = '¡Cannot add details, fill in fields!';
        Swal.fire('Information!', mensaje, 'info');
      }
    }
    
  }

  filterReserv() {
    const parameter = {
      idBandeja: '3',
      busqueda: this.articSearch
    }

    this.inventario.searchArticles(parameter).subscribe((res) => {

      this.validarItemReserve(res.data);
    });
  }

  filter() {
    const parameter = {
      idUsuario: 61,
      busqueda: this.articSearch,
      idAlmacen: this.idAlmacen
    }

    this.inventario.searchArticlesforInvent(parameter).subscribe((res) => {

      // this.validarItemsSearch(res.data);
      this.articles = res.inventario
    });
  }

  filterCoffe() {
    const parameter = {
      idBandeja: '3',
      busqueda: this.articSearch
    }
    this.inventario.searchArticles(parameter).subscribe((res) => {
      this.validarItemsSearch(res.data);
      $('#filterModal').modal('show');
    });
  }

  validarItemReserve(inven) {
    console.log( inven);
    this.articles = [];
    for (const i of Object["values"](inven)) {

      // const storage = this.reservarbodega.filter(x => x.almacen == i['almacen'])
      // console.log()

      // i["StorageArea"] = `${storage[0].idAlmacen}`;
      i["idItem"] = `${i['IdItem']}`;
      i['lote'] = `${""}`;
      i["item"] = `${i["Descripción"]}`;
      i["valorUnitario"] = `${i["Costo Unitario"]}`;
      i["classification"] = `${i["Clasificación"]}`;
      i["ProcesoItem"] = `${i["Proceso Item"]}`;
      i["SubCategoria"] = `${i["SubCategoría"]}`;
      i['origen'] = `${i["Origen"]}`;
      i["precioPromedio"] = `${i["Precio Promedio"]}`;
      this.articles.push(i);
    }

    

  }

  validarItemsSearch(inven) {
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
      i["precioPromedio"] = `${i["Precio Promedio"]}`;
      i["SubCategoria"] = `${i["SubCategoría"]}`;
      this.articles.push(i);
    }


  }

  getInventory(): void {
    this.selectInventoryNew();

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

  checkPushReser(ev) {

    if (!ev.target.checked) {
      const valued = this.articles.filter(x => x.IdItem == ev.target.value)
      valued.map((contad) => {
        var indice = this.detalleProductList.indexOf(contad.IdItem);
        this.detalleProductList.splice(indice, 1);
      });
    } else {
      const valued = this.articles.filter(x => x.IdItem == ev.target.value)
      valued.map((contad) => {
        this.detalleProductList.push(
          contad
        );
      });

      this.valuedContador = this.detalleProductList;

    }

  }


  cargaritems() {

  }


  validarItemsEditable(inven) {

    // this.valuedContador = [];

    const unicos = [];
    inven.forEach(element => {


      this.valuedContador.map((arti) => {

        console.log(arti)
        if (arti.idItem == element.idItem) {
          var suma = 0;
          // element.precios.forEach(elementpr => {
          //   for (var x = 0; x < element.precios.length; x++) {
          //     suma += elementpr.precio;
          //   }
          //   var promedio = suma / element.precios.length;
          //   var totales = parseInt(arti['cantidad']) * arti.valorUnitario;
          //   arti["totales"] = `${totales}`;
          //   arti["precioPromedio"] = `${promedio}`;
          //   arti["StorageArea"] = `${arti.idAlmacenOrigen}`;

          // });

          var totales = parseInt(arti.cantidad) * parseInt(arti.valorUnitario);
          arti["totales"] = `${totales}`;
          // arti["precioPromedio"] = `${promedio}`;
          arti["StorageArea"] = `${arti.idAlmacenOrigen}`;


          var variedad = this.subessearch.filter(function (artic) {
            return artic.idVariedadItem == element.idVariedadItem;
          });
          var origen = this.originlist.filter(function (origi) {
            return origi.idOrigenItem == element.idOrigenItem;
          });
          arti['variedad'] = `${variedad[0]["descripcion"]}`;
          arti['origen'] = `${origen[0]["descripcion"]}`;
          arti["editable"] = `${false}`;
          arti['Quantity'] = `${arti.cantidad}`;
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

  validarItemsadd(inven) {

    // this.valuedContador = [];

    const unicos = [];

    this.valuedContador.map((arti) => {
      if (arti.IdItem == inven.idItem) {
        arti.editable = "";
        arti.IdItem = inven.idItem;
       
        arti.total = parseInt(arti.cantidad) * parseInt(arti.valorUnitario);
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

  validar(inven) {
    console.log('es', inven)

    const unicos = [];

    this.dataChanged[0].map((arti) => {
      console.log('es', arti)
      if (arti.IdItem == inven.IdItem) {

        if (arti.idDocumentoBodega) {

        } else {
          const storage = this.reservarbodega.filter(x => x.almacen == arti['almacen'])

          arti["StorageArea"] = `${storage[0].idAlmacen}`;

        }


        arti.editable = "";
        arti.totales = parseInt(arti.Quantity) * parseInt(arti.valorUnitario);
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

  AddProduct(): void {
    // this.validarItemsEditable(this.valuedContador);
    $('#filterModal').modal('hide')
    this.articles = [];
    this.articSearch = "";
    this.tablaConItems = true;
  }
  AddProducts(): void {
    // this.validarItemsEditable(this.valuedContador);
    this.articles = [];
    this.articSearch = "";
    // this.detalleProductList.map((articCont) => {
    //   console.log(articCont);
    //   this.detalleProduct.push({
      
       
    //     idItem: parseInt(articCont.IdItem),
    //     cantidad: 0,
    //     StorageArea: '',
    //     valorUnitario: parseInt(articCont.valorUnitario),
    //     lote: '',
    //     disponible: 0,
    //     reserva: 0,
    //     transito: 0,
    //     item: articCont.item,
    //     origen: articCont.origen,
    //      idReferenciaDocumentoCompra: 0,
    //       idDocumentoBodega: parseInt(this.idDocu),
    //       fechaVencimiento: "2021-10-12T20:58:42.846Z",
    //       posicion: "",
    //       idAlmacenOrigen: 0,
    //       idAlmacenDestino: 0,
    //       idReferenciaDocumentoBodegaDestino: 0,
    //       almacenOrigen: "",
    //       almancenDestino: '',
    //       bodegaDestino: '',
    //       bodegaOrigen: "",
    //       sku: '',
    //       proceso: "",
    //       clasificacion: "",
    // });
    //   this.valuedContador = this.concatenardatos(this.detalleProduct);
    //   // this.valuedContador = this.detalleProductList;
    // });
   
    // // console.log(this.detalleProductList);
    //  this.detalleProductList = [];
     
    this.tablaConItems = true;
    $('#filterReserv').modal('hide')

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

  addDetalle(datos) {

    this.nombreItem = datos.descripcion;
    this.unitValue = parseInt(datos.valorUnitario);

    this.validarItemsadd(datos)
    // this.editableForm = false;
  }

  addDetalles(datos, almancen) {
    this.valuedContador.map((arti) => {
      if (arti.idItem == parseInt(datos.idItem)) {
        const parameter = {
          idUsuario: 61,
          IdItem: parseInt(datos.idItem),
          idAlmacen: parseInt(almancen)
        }
        this.inventario.searchBodegaItem(parameter).subscribe((res) => {
          console.log(res)
          if (res.inventario.length == 0) {
            this.valuedContador.forEach(element => {
              element.disponible = 0
              element.cantidad = 0;
              element.reserva = 0;
              element.transito = 0;
              element.clasificacion = arti.classification;
              this.valuedContador.push(element)
            });
           
            this.valuedContador = this.concatenardatos(this.valuedContador);
          } else {
            const invent = []
            for (const i of Object["values"](res.inventario)) {
                arti.idReferenciaDocumentoCompra = 0;
                arti.idDocumentoBodega = parseInt(this.idInventory),
                arti.idItem = i['idItem'],
                arti.cantidad = 0,
                arti.StorageArea = almancen,
                arti.valorUnitario = i['valorUnitario'],
                arti.lote = '',
                arti.disponible = i['cantidad'],
                arti.reserva = i['reserva'],
                arti.transito = i['transito'],
                arti.item = i['item'],
                arti.origen = i['origen'],
                arti.fechaVencimiento = "2021-10-12T20:58:42.846Z",
                arti.posicion = "",
                arti.idAlmacenOrigen = 0,
                arti.idAlmacenDestino = 0,
                arti.idReferenciaDocumentoBodegaDestino = 0,
                arti.almancenDestino = "",
                arti.almacenOrigen = i['almacen'],
                arti.bodegaDestino = i['bodega'],
                arti.bodegaOrigen = i['bodega'],
                arti.sku = ""
                arti.proceso = "",
                arti.clasificacion = i['clasificacion']

                invent.push(arti)
            }

            this.valuedContador = this.concatenardatos(invent);
          }
        });
      }
    })

  }

  concatenardatos(datos){

    const unicos = [];
    for (var i = 0; i < datos.length; i++) {

      const elemento = datos[i];

      if (!unicos.includes(datos[i])) {
        unicos.push(elemento);
      }
    }

    return unicos;
  }

  selectInventoryNew(): void {
    this.fields = this.datainventory.newInvetory();
  }

  guardarDetalle(): void {
    this.detalleProduct = [
      {
        idReferenciaDocumentoCompra: 0,
        idDocumentoBodega: parseInt(this.idInventory),
        idItem: this.idITem,
        cantidad: this.quantity,
        valorUnitario: this.unitValue,
        fechaVencimiento: "2021-10-12T20:58:42.846Z",
        posicion: this.inventory,
        idAlmacenOrigen: parseInt(this.bodega),
        idAlmacenDestino: 0,
        idReferenciaDocumentoBodegaDestino: 0
      }
    ]
    $('#staticBackdrop').modal('hide')
  }

  calcular() {
    this.total = this.quantity * this.unitValue;
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

  fieldsTable() {
    $('#campos').modal('show')
    this.CamposTabla = [

      { name: "Name", id: 1, show: 1 },
      // { name: "Distribution Center", id: 2, show: 0 },
      { name: "Warehouse", id: 3, show: 1 },
      { name: "Class", id: 4, show: 1 },
      { name: "# Lot", id: 11, show: 1 },
      { name: "Available", id: 5, show: 1 },
      { name: "Transit", id: 6, show: 1 },
      { name: "Reserve", id: 7, show: 1 },
      // { name: "Time", id: 8, show: 0 },
      // { name: "SKU", id: 9, show: 0 },
      // { name: "Total cost", id: 10, show: 0 },
    
      { name: "Varietal", id: 12, show: 0 },
      { name: "Process", id: 13, show: 0 },
      // { name: "Unit Price", id: 14, show: 0 },
      // { name: "Unit Value", id: 15, show: 0 },
      { name: "Total", id: 16, show: 1 },
    ];
  }
  inactivar(item) {
  
    if (item == 'Warehouse') {
      this.Warehouse = false;
    }
    if (item == 'Name') {
      this.Name = false;
    }
    if (item == 'Class') {
      this.Class = false;
    }
    if (item == 'Lot') {
      this.Lot = false;
    }
    if (item == 'Available') {
      this.Available = false;
    }
    if (item == 'Transit') {
      this.Transit = false;
    }
    if (item == 'Reserved') {
      this.Reserved = false;
    }
    if (item == 'Total') {
      this.Total = false;
    }
    if (item == 'Varietal') {
      this.Varietal = false;
    }
    if (item == 'Process') {
      this.Process = false;
    }

  }
  activar() {
    this.CamposTabla.map(element => {
      if (element.name == 'Warehouse') {
        this.Warehouse = element.show;
      }
      if (element.name == 'Name') {
        this.Name = element.show;
      }
      if (element.name == '# Lot') {
        this.Lot = element.show;
      }
      if (element.name == 'Class') {
        this.Class = element.show;
      }
      if (element.name == 'Available') {
        this.Available = element.show;
      }
      if (element.name == 'Transit') {
        this.Transit = element.show;
      }
      if (element.name == 'Reserved') {
        this.Reserved = element.show;
      }
      if (element.name == 'Total') {
        this.Total = element.show;
      }
      if (element.name == 'Varietal') {
        this.Varietal = element.show;
      }
      if (element.name == 'Process') {
        this.Process = element.show;
      }
    });
  }
}
