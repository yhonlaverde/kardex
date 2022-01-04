import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ArticlesService } from 'src/app/shared/services/articles/articles.service';
import { DocumentoService } from 'src/app/shared/services/articles/documento.service';
import { LoginService } from 'src/app/shared/services/auth/login.service';
import { DatabaseService } from 'src/app/shared/services/dataBase/database.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import Swal from 'sweetalert2';
import { DataInventory } from '../../../data/baseData/dataInventory/dataInventory';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
declare var $: any;

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss'],
})
export class CreateReservationComponent<t, k> implements OnInit {
  idInventory: any;
  fields: any[];
  action: IAction<t, k>[];
  actionAdd: IAction<t, k>[];
  articles: any;
  articSearch: any;
  parameterCliente: any;
  parameterSupplier: any;
  clientListSearch: any;
  supplierListSearch: any;
  documentNo = 0;
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
  idITem;
  parameterMotivo: any;
  editableForm: boolean = true;
  reservar: boolean = false;
  reservarbodega: any;
  motivoList: any;
  idDocumentoBodega: any;
  statusFormDo: any;
  dataChanged: any;
  guardar: boolean;
  parameter: any;
  idReserva: any;
  idAlmacen;
  almacenLs;
  tableHeader = [
    'Name',
    'Warehouse',
    '# Lot',
    'Quantity',
    'Available',
    'Reserve',
    'Transit',
    'Price Unit',
    'Total',
    'Origin',
    'Actions',
  ];
  userlogue: any;
  fechaCreacion;
  CamposTabla;
  paginationCampo: number = 1;
  itemsPagescampo: number = 5;
  Warehouse: boolean = true;
  Name: boolean = true;
  Class: boolean = true;
  Lot: boolean = true;
  Transit: boolean = true;
  Reserved: boolean = true;
  Total: boolean = true;
  Available: boolean = true;
  Action: boolean = true;
  Varietal: boolean = false;
  Process: boolean = false;
  docu = 'doc';
  Activartodos: boolean = true;
  detalleProductList;
  constructor(
    private activatedRoute: ActivatedRoute,
    private datainventory: DataInventory,
    public maestros: DatabaseService,
    public inventario: ArticlesService,
    public docm: DocumentoService,
    public loginservice: LoginService,private router: Router,
  ) {
    const hoy = moment().format();
    this.fechaCreacion = hoy;
    this.fields = [];
    this.valuedContador = [];
    this.almacenLs = [];
    this.detalleProduct = [];
    this.detalleProductList = [];
    this.action = [
      {
        description: 'New',
        icon: 'mdi mdi-open-in-new',
      },
      {
        description: 'Save',
        icon: 'mdi mdi-content-save',
      },

      {
        description: 'Approve',
        icon: 'mdi mdi-checkerboard',
      },
      {
        description: 'Return',
        icon: 'mdi mdi-keyboard-return',
      },
      // {
      //   description: "To print",
      //   icon: "mdi mdi-cloud-print",
      // },
    ];
    this.actionAdd = [
      {
        description: '',
        icon: 'mdi mdi-folder-plus',
      },
    ];
    this.activatedRoute.params.subscribe((Params) => {
      this.idInventory = Params['id'];

      if (this.idInventory == 2) {
        this.statusFormDo = 'PENDING';
        this.supplierSelect = true;
        this.customerSelect = false;
        this.detalleAcordion = true;
      } else if (this.idInventory == 6) {
        this.statusFormDo = 'PENDING';
        this.supplierSelect = false;
        this.customerSelect = true;
        this.detalleAcordion = false;
      } else if (this.idInventory == 12) {
        this.statusFormDo = 'PENDING';
        this.idReserva = this.idInventory;
        this.supplierSelect = false;
        this.customerSelect = true;
        this.detalleAcordion = false;
        this.reservar = true;
        this.reservarbodega = JSON.parse(this.loginservice.getTokenJeraquia());
        console.log(this.reservarbodega);
      }
    });

    this.parameterCliente = {
      idCliente: 0,
      codigo: '',
      identificacion: '',
      nombre: '',
      direccion: '',
      telefono: '',
      contacto: '',
      observaciones: '',
      idCiudad: 0,
      correo: '',
      idUsuarioModificacion: 0,
      fechaModificacion: '2021-09-30T14:19:54.114Z',
      estado: '',
    };

    this.parameterSupplier = {
      idProveedor: 0,
      codigo: '',
      identificacion: '',
      nombre: '',
      direccion: '',
      telefono: '',
      contacto: '',
      observaciones: '',
      idCiudad: 0,
      correo: '',
      idUsuarioModificacion: 0,
      fechaModificacion: '2021-09-30T14:19:54.114Z',
      estado: '',
    };

    this.parameterAlmacen = {
      idAlmacen: 0,
      codigo: '',
      descripcion: '',
      observaciones: '',
      contacto: '',
      telefono: '',
      idBodega: 0,
      correoUsuario: '',
      correoOperador: '',
      idCiudad: 0,
      idUsuarioModificacion: 0,
      fechaModificacion: '2021-09-30T12:46:39.127Z',
      estado: '',
      codigoPostal: '',
    };

    this.parameterMotivo = {
      idMotivo: 0,
      codigo: '',
      descripcion: '',
      orden: 0,
      idTipoDocumento: 0,
    };
  }

  ngOnInit(): void {
   
    this.reservarbodega = JSON.parse(this.loginservice.getTokenJeraquia());
    var unidod = '';
    // var bodega = "";
    // var centro = ""
    this.reservarbodega.map((unid) => {
      unidod += unid.idAlmacen + ',';
    });

    this.idAlmacen = unidod;
    this.initvalue();
    this.getInventory();
  }

  initvalue(): void {
    this.maestros.getAlmacen(this.parameterAlmacen, 'GET').subscribe((alma) => {
      this.bodegas = alma.almacenes;
    });
    this.maestros
      .getCliente(this.parameterCliente, 'GET')
      .subscribe((client) => {
        this.clientListSearch = client.clientes;
      });

    this.maestros
      .getProveedor(this.parameterSupplier, 'GET')
      .subscribe((supplier) => {
        this.supplierListSearch = supplier.proveedores;
      });

    this.docm.getMotivo(this.parameterMotivo, 'GET').subscribe((sub) => {
      this.motivoList = sub.motivos.filter(
        (x) => x.idTipoDocumento == this.idInventory
      );

      // this.motivoList = sub.motivos;
    });
  }

  actionExecuted(event): void {
    switch (event.description) {
      case 'folder_open':
        // this.abrirArticulo(paramevents.id);
        break;

      case 'Return':
        location.reload();
        break;

      case 'Load Products':
        // this.filterProduct();
        break;

      case 'Save':
        this.estado = '1';
        this.GuardarDocumento();
        break;
      case 'Approve':
        this.estado = '2';
        this.updateDocumento();
        break;

      default:
        throw new Error(`No existe la acción ${event.action} en la bandeja`);
    }
  }

  GuardarDocumento() {
    this.detalleProduct = [];
    if (this.validarEnvioAGuardar()) {
      if (this.valuedContador.length == 0) {
        Swal.fire('Info!', 'no details added!', 'info');
      } else {
        this.valuedContador.map((articCont) => {
          // if (articCont.idItem) {
          //   articCont.idItem = articCont.IdItem
          // }
          this.detalleProduct.push({
            idReferenciaDocumentoCompra: 0,
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
            idDocumentoBodega: 0,
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
            fechaModificacion: this.fechaCreacion,
            detalle: this.detalleProduct,
          };
        } else if (this.supplier == undefined) {
          this.parameter = {
            idDocumentoBodega: 0,
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
            fechaModificacion: this.fechaCreacion,
            detalle: this.detalleProduct,
          };
        }
        console.log('datosBD',this.parameter)
        this.docm.getDocumento(this.parameter, 'INS').subscribe((result) => {
          this.documentNo = result.documento[0].numeroDocumento;
          this.estado = result.documento[0].estado;

          this.idDocumentoBodega = result.documento[0].idDocumentoBodega;
          this.validarEstadoString(this.estado);

          Swal.fire({
            title: 'Save Correct!',
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: 'rgb(35 80 105)',
            cancelButtonColor: '#a5dc86',
            confirmButtonText: 'Back To List!',
            denyButtonText: `Ok`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              location.reload();
            } else if (result.isDenied) {
            }
          });
          // location.reload()
        });
      }
    } else {
      Swal.fire('error!', 'Required fields are mandatory!', 'error');
    }
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

  aprobarDocumento(idDocumentoBodega) {
    const parameters = {
      idDocumentoBodega: parseInt(idDocumentoBodega),
      idUsuario: 61,
    };
    this.docm.getAprobarDocumento(parameters).subscribe((resu) => {
      this.validarEstadoString(this.estado);
      if (resu.estado[0].msgId === -1) {
        Swal.fire('Information!', resu.estado[0].msgStr, 'info');
      } else {
        Swal.fire({
          title: 'Document Approve Correct!',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#a5dc86',
          confirmButtonText: 'Back To List!',
          cancelButtonText: 'Ok',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            location.reload();
          } else if (result.isDenied) {
          
          }
        });
      }
      // location.reload()
    });
  }

  updateDocumento() {
    this.detalleProduct = [];
    Swal.fire({
      title: 'You are sure to approve this document?',
      showDenyButton: true,
      showCancelButton: true,
      icon: 'info',
      cancelButtonText: 'Ok',
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (this.validarEnvioAGuardar()) {
        if (this.valuedContador.length == 0) {
          Swal.fire('Info!', 'no details added!', 'info');
        } else {
          this.valuedContador.map((articCont) => {
            this.detalleProduct.push({
              idReferenciaDocumentoCompra: 0,
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
              idDocumentoBodega: 0,
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
              fechaModificacion: this.fechaCreacion,
              detalle: this.detalleProduct,
            };
          } else if (this.supplier == undefined) {
            this.parameter = {
              idDocumentoBodega: 0,
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
              fechaModificacion: this.fechaCreacion,
              detalle: this.detalleProduct,
            };
          }
          this.docm.getDocumento(this.parameter, 'INS').subscribe((result) => {
            this.documentNo = result.documento[0].numeroDocumento;
            // this.estado = result.documento[0].estado;
            this.idDocumentoBodega = result.documento[0].idDocumentoBodega;
          
            this.aprobarDocumento(this.idDocumentoBodega);
            // location.reload()
          });
        }
      } else {
        Swal.fire('error!', 'Required fields are mandatory!', 'error');
      }
      /* Read more about isConfirmed, isDenied below */
    });
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
      idAlmacen: this.idAlmacen,
    };

    this.inventario.searchArticlesforInvent(parameter).subscribe((res) => {
      this.validarItemsSearch(res.inventario);
      // this.articles = res.inventario
    });
  }

  filterCoffe() {
    const parameter = {
      idBandeja: '3',
      busqueda: this.articSearch,
    };
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
    for (const i of Object['values'](inven)) {
      const storage = this.reservarbodega.filter(
        (x) => x.almacen == i['almacen']
      );

      i['StorageArea'] = `${storage[0].idAlmacen}`;

      this.articles.push(i);
    }

    console.log(this.articles);
  }

  getInventory(): void {
    this.selectInventoryNew();
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

    }

  }


  checkPush(ev) {
    if (!ev.target.checked) {
      const valued = this.articles.filter((x) => x.almacen == ev.target.value);
      valued.map((contad) => {
        var indice = this.detalleProductList.indexOf(contad.almacen);
        this.detalleProductList.splice(indice, 1);
      });
    } else {
      const valued = this.articles.filter((x) => x.almacen == ev.target.value);
      valued.map((contad) => {
        this.detalleProductList.push(contad);
      });
      this.valuedContador = this.detalleProductList;
    }
  }
  checkCampos(ev) {
    this.CamposTabla;
    const camposDeselec = [];
    if (!ev.target.checked) {
      const valued = this.CamposTabla.filter((x) => x.id == ev.target.value);
      valued.map((contad) => {
        var indice = camposDeselec.indexOf(contad.id);
        camposDeselec.splice(indice, 1);
      });
    } else {
      const valued = this.CamposTabla.filter((x) => x.id == ev.target.value);
      valued.map((contad) => {
        camposDeselec.push(contad);
      });
    }
  }

  validarItemsEditable(inven) {
    this.valuedContador = [];
    for (const i of Object['values'](inven)) {
      i['editable'] = `${false}`;
      i['total'] = `${0}`;
      this.valuedContador.push(i);
    }
  }

  validarItemsadd(inven) {
    // this.valuedContador = [];

    const unicos = [];

    this.valuedContador.map((arti) => {
      if (arti.almacen == inven.almacen) {
        arti.editable = '';
        arti.totalPrecio =
          parseInt(inven.Quantity) * parseInt(inven.valorUnitario);
        this.valuedContador.push(arti);
      }
    });

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
    // this.valuedContador = [];

    const unicos = [];

    this.dataChanged[0].map((arti) => {
      if (this.idInventory == 12) {
        if (parseInt(arti.Quantity) > inven.cantidad) {
          Swal.fire({
            title: 'amount entered is greater than the amount available.',
            showClass: {
              popup: 'animate__animated animate__fadeInLeft',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutRight',
            },
          });
        }
        if (arti.IdItem == inven.IdItem) {
          arti.editable = '';
          arti.totalPrecio =
            parseInt(arti.Quantity) * parseInt(arti.valorUnitario);

          this.dataChanged[0].push(arti);
        }
      } else {
        if (arti.IdItem == inven.IdItem) {
          arti.editable = '';
          arti.totalPrecio =
            parseInt(arti.Quantity) * parseInt(arti.valorUnitario);

          this.dataChanged[0].push(arti);
        }
      }
    });

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
    $('#filterModal').modal('hide');
    
    this.articles = [];
    this.articSearch = '';
    this.tablaConItems = true;
    this.guardar = false;
  }

  AddProducts(): void {
    // this.validarItemsEditable(this.valuedContador);
    this.articles = [];
    this.articSearch = "";
    this.detalleProductList.map((articCont) => {
      this.detalleProduct.push({
        idItem: parseInt(articCont.IdItem),
        cantidad: 0,
        StorageArea: '',
        valorUnitario: parseInt(articCont.valorUnitario),
        lote: '',
        disponible: 0,
        reserva: 0,
        transito: 0,
        item: articCont.item,
        origen: articCont.origen,
         idReferenciaDocumentoCompra: 0,
          idDocumentoBodega: 0,
          fechaVencimiento: "2021-10-12T20:58:42.846Z",
          posicion: "",
          idAlmacenOrigen: 0,
          idAlmacenDestino: 0,
          idReferenciaDocumentoBodegaDestino: 0,
          almacenOrigen: "",
          almancenDestino: '',
          bodegaDestino: '',
          bodegaOrigen: "",
          sku: articCont.sku,
          proceso: "",
          clasificacion: "",
      });
      this.valuedContador = this.concatenardatos(this.detalleProduct);
      // this.valuedContador = this.detalleProductList;
    });
   
    // console.log(this.detalleProductList);
     this.detalleProductList = [];
     
    this.tablaConItems = true;
    $('#filterReserv').modal('hide')

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

  onInputChanged(value: string, rowIndex: number, propertyKey: string): void {
    // this.quantity = value;
    this.guardar = true;
    this.dataChanged = [];
    const newValue = this.valuedContador.map((row, index) => {
      return index !== rowIndex ? row : { ...row, [propertyKey]: value };
    });
    this.dataChanged.push(newValue);

    // this.validarItemsadd(this.dataChanged)
  }

  addDetalle(datos) {
    this.guardar = true;
    this.nombreItem = datos.descripcion;
    this.unitValue = parseInt(datos.valorUnitario);

    this.validarItemsadd(datos);
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
              element.cantidad = 0;
              element.reserva = 0;
              element.transito = 0;
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
              arti.bodegaDestino = "",
              arti.bodegaOrigen = "",
              arti.sku = ""
              arti.proceso = "",
              arti.clasificacion = i['clasificacion']
              // i["StorageArea"] = `${almancen}`;
              // i['loteNum'] = `${""}`;

              this.valuedContador.push(arti)
            }

            this.valuedContador = this.concatenardatos(this.valuedContador);
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
        fechaVencimiento: '2021-10-12T20:58:42.846Z',
        posicion: this.inventory,
        idAlmacenOrigen: parseInt(this.bodega),
        idAlmacenDestino: 0,
        idReferenciaDocumentoBodegaDestino: 0,
      },
    ];
    $('#staticBackdrop').modal('hide');
  }

  calcular() {
    this.total = this.quantity * this.unitValue;
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

  deleteArticulo(idArti): void {
    const array = [];
    for (var i = 0; i < this.valuedContador.length; i++) {
      this.valuedContador[i]['idReal'] = i;
      array.push(this.valuedContador[i]);
    }
    var articulo = array.filter(function (artic) {
      return artic.idReal !== idArti;
    });
    this.valuedContador = articulo;
  }

  fieldsTable() {
    $('#campos').modal('show');
    this.CamposTabla = [
      { name: 'Name', id: 1, show: 1 },
      // { name: "Distribution Center", id: 2, show: 0 },
      { name: 'Warehouse', id: 3, show: 1 },
      { name: 'Class', id: 4, show: 1 },
      { name: '# Lot', id: 11, show: 1 },
      { name: 'Available', id: 5, show: 1 },
      { name: 'Transit', id: 6, show: 1 },
      { name: 'Reserve', id: 7, show: 1 },
      // { name: "Time", id: 8, show: 0 },
      // { name: "SKU", id: 9, show: 0 },
      // { name: "Total cost", id: 10, show: 0 },

      { name: 'Varietal', id: 12, show: 0 },
      { name: 'Process', id: 13, show: 0 },
      // { name: "Unit Price", id: 14, show: 0 },
      // { name: "Unit Value", id: 15, show: 0 },
      { name: 'Total', id: 16, show: 1 },
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
    this.CamposTabla.map((element) => {
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
