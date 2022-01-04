import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticlesService } from 'src/app/shared/services/articles/articles.service';
import { DocumentoService } from 'src/app/shared/services/articles/documento.service';
import { LoginService } from 'src/app/shared/services/auth/login.service';
import { DatabaseService } from 'src/app/shared/services/dataBase/database.service';
import { DataInventory } from 'src/data/baseData/dataInventory/dataInventory';
import { IAction } from 'src/data/modelos/controles/IAction';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  selectedImage: any;
  imagen: any;
  articSearch;
  selectedFiles: FileList;
  documentNo = 0;
  //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  progressInfo = [];
  message = '';
  fileName = '';
  articles;
  nombreItem;
  reservarbodega: any;
  dataChanged: any;
  unitValue;
  detalleProduct;
  detalleProductList;
  valuedContador: any[];
  tablaConItems: boolean = false;
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
  parameterPuerto;
  supplierListSearch;
  idAlmacen;
  idPuertoDestino;
  idPuertoOrigen;
  // 'M$', 'DIF'
  tableHeader = [
    'LOT #',
    'Package type (Kg)',
    'Product Name',
    'Warehouse',
    'Quantity',
    'Available',
    'Reserve',
    'Transit',
    'Price Unit',
    'Total',
    'Actions',
  ];
  Warehouse: boolean = true;
  Name: boolean = true;
  Class: boolean = true;
  Lot: boolean = false;
  Transit: boolean = true;
  Reserved: boolean = true;
  Total: boolean = true;
  Available: boolean = true;
  Action: boolean = true;
  docu = 'doc';
  Activartodos: boolean = false;
  destinationPuerto;
  origenPuerto;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datainventory: DataInventory,
    public maestros: DatabaseService,
    public inventario: ArticlesService,
    public docm: DocumentoService,
    public loginservice: LoginService
  ) {
    this.valuedContador = [];

    this.detalleProduct = [];
    this.destinationPuerto = [];

    this.origenPuerto = [];
    this.detalleProductList = [];
    this.statusFormDo = 'REQUIRED';
    this.action = [
      {
        description: 'New',
        icon: 'mdi mdi-open-in-new',
      },
      {
        description: 'Save',
        icon: 'mdi mdi-content-save',
      },

      // {
      //   description: "Approve",
      //   icon: "mdi mdi-check-all",
      // },
      // {
      //   description: "Annul",
      //   icon: "mdi mdi-stop",
      // },
      // {
      //   description: "To print",
      //   icon: "mdi mdi-cloud-print",
      // },
      {
        description: 'Return',
        icon: 'mdi mdi-keyboard-return',
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
      observaciones: '',
      idCiudad: 0,
      correo: '',
      idUsuarioModificacion: 0,
      fechaModificacion: '2021-09-30T14:19:54.114Z',
      estado: '',
    };
    this.parameterPuerto = {
      idPuerto: 0,
      codigo: '',
      descripcion: '',
      tipo: '',
    };
  }

  ngOnInit(): void {
    $('a[download]').each(function () {
      var $a = $(this),
        fileUrl = $a.attr('href');

      $a.attr(
        'href',
        'data:application/octet-stream,' + encodeURIComponent(fileUrl)
      );
    });

    this.docm.getPuerto(this.parameterPuerto, 'GET').subscribe((marc) => {
      console.log(marc);
      this.validarPuertos(marc.puertos);
      // this.unidad = marc.puertos;
      // this.searchArticulo = marc.puertos;
    });

    this.maestros
      .getProveedor(this.parameterSupplier, 'GET')
      .subscribe((supplier) => {
        this.supplierListSearch = supplier.proveedores;
      });

    this.reservarbodega = JSON.parse(this.loginservice.getTokenJeraquia());
    var unidod = '';
    // var bodega = "";
    // var centro = ""
    this.reservarbodega.map((unid) => {
      unidod += unid.idAlmacen + ',';
    });

    this.idAlmacen = unidod;
  }

  actionExecuted(event): void {
    switch (event.description) {
      case 'folder_open':
        // this.abrirArticulo(paramevents.id);
        break;

      case 'Annul':
        break;

      case 'Approve':
        break;
      case 'Return':
        location.reload();
        break;

      case 'Save':
        this.estado = '1';
        this.GuardarCompra();
        break;

      default:
        throw new Error(`No existe la acción ${event.action} en la bandeja`);
    }
  }
  validarPuertos(port) {
    
    port.map((puer) => {
      if (puer.tipo == "O") {
        // destinationPuerto
        this.idPuertoOrigen = puer.idPuerto
        this.origenPuerto.push(puer);
      }
      if (puer.tipo == 'D') {
        this.idPuertoDestino =  puer.idPuerto
        this.destinationPuerto.push(puer);
      }
    });
    console.log(this.origenPuerto)
    console.log(this.destinationPuerto)
  }

  GuardarCompra() {
    this.valuedContador.map((articCont) => {
      this.detalleProduct.push({
        idReferenciaOrdenCompra: 0,
        idOrdenCompra: 0,
        idItem: parseInt(articCont.idItem),
        cantidad: parseInt(articCont.Quantity),
        valorUnitario: parseInt(articCont.valorUnitario),
        fechaVencimiento: '2021-10-12T20:58:42.846Z',
        posicion: '',
        idAlmacen: parseInt(articCont.StorageArea),
        lote: articCont.loteNum,
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
      idOrdenCompra: 0,
      numeroDocumento: 0,
      estado: this.estado,
      documentoReferencia: this.documentoReferencia,
      idProveedor: this.idProveedor,
      actividad: this.actividad,
      observacion: this.observacion,
      idUsuarioCreacion: 61,
      idUsuarioModificacion: 61,
      fechaCreacion: '2021-12-14T19:52:13.006Z',
      fechaModificacion: '2021-12-14T19:52:13.006Z',
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
      detalle: this.detalleProduct,
    };

    this.docm.ordenCompra(parameter, 'INS').subscribe((result) => {
      // this.numeroDocumento = result.documento[0].numeroDocumento;
      // this.estado = result.documento[0].estado;

      // this.idDocumentoBodega = result.documento[0].idDocumentoBodega;
      this.validarEstadoString(this.estado);

      Swal.fire({
        title: 'Save Correct!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: 'rgb(35 80 105)',
        cancelButtonColor: '#a5dc86',
        confirmButtonText: 'Back To List!',
        cancelButtonText: 'Ok',
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

  imgAccordion(event) {
    event.target.files.length == 1
      ? (this.fileName = event.target.files[0].name)
      : (this.fileName = event.target.files.length + ' archivos');
    this.selectedFiles = event.target.files;
  }

  deleteFile(filename) {}

  filterProduct() {
    $('#filterModal').modal('show');
  }

  filter() {
    const proceso = 'GET'
    const parameter = {
      descripcion: this.articSearch,
      estado: "1",
      sku: ""
    };

    this.inventario.GuardarArticulo(parameter,proceso).subscribe((res) => {
      console.log(res)
      this.validarItemsSearch(res.items);
    });
  }

  checkPush(ev) {
    if (!ev.target.checked) {
      const valued = this.articles.filter((x) => x.IdItem == ev.target.value);
      valued.map((contad) => {
        var indice = this.valuedContador.indexOf(contad.IdItem);
        this.valuedContador.splice(indice, 1);
      });
    } else {
      const valued = this.articles.filter((x) => x.IdItem == ev.target.value);
      valued.map((contad) => {
        this.valuedContador.push(contad);
      });
    }
  }

  addDetalle(datos, almancen) {
    this.detalleProductList.map((arti) => {
      if (arti.idItem == parseInt(datos.idItem)) {
        const parameter = {
          idUsuario: 61,
          IdItem: parseInt(datos.idItem),
          idAlmacen: parseInt(almancen),
        };
        this.inventario.searchBodegaItem(parameter).subscribe((res) => {
          console.log(res);
          if (res.inventario.length == 0) {
            this.detalleProductList.forEach((element) => {
              element.cantidad = 0;
              element.reserva = 0;
              element.transito = 0;
              this.detalleProductList.push(element);
            });

            this.detalleProductList = this.concatenardatos(
              this.detalleProductList
            );
          } else {
            const invent = [];
            for (const i of Object['values'](res.inventario)) {
              arti.idReferenciaOrdenCompra = 0;
              arti.idOrdenCompra = 0;
              (arti.idItem = i['idItem']),
                (arti.StorageArea = almancen),
                (arti.valorUnitario = i['valorUnitario']),
                (arti.loteNum = ''),
                (arti.disponible = i['cantidad']),
                (arti.reserva = i['reserva']),
                (arti.transito = i['transito']),
                (arti.item = i['item']),
                (arti.origen = i['origen']),
                (arti.totalPrecio = 0);
              // i["StorageArea"] = `${almancen}`;
              // i['loteNum'] = `${""}`;

              this.detalleProductList.push(arti);
            }

            this.detalleProductList = this.concatenardatos(
              this.detalleProductList
            );
          }
        });
      }
    });
  }

  concatenardatos(datos) {
    const unicos = [];
    for (var i = 0; i < datos.length; i++) {
      const elemento = datos[i];

      if (!unicos.includes(datos[i])) {
        unicos.push(elemento);
      }
    }

    return unicos;
  }

  validarItemsadd(inven) {
    // this.valuedContador = [];

    const unicos = [];

    this.valuedContador.map((arti) => {
      if (arti.IdItem == inven.IdItem) {
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

  validarItemsSearch(inven) {
    console.log(inven)
    this.articles = [];
    for (const i of Object['values'](inven)) {
      // const storage = this.reservarbodega.filter(x => x.almacen == i['almacen'])
      // console.log()

      // i["StorageArea"] = `${storage[0].idAlmacen}`;
   
      i['loteNum'] = `${''}`;
      
      this.articles.push(i);
    }
   
  }

  onInputChanged(value: string, rowIndex: number, propertyKey: string): void {
    // this.quantity = value;
    this.dataChanged = [];

    const newValue = this.detalleProductList.map((row, index) => {
      return index !== rowIndex ? row : { ...row, [propertyKey]: value };
    });
    this.dataChanged.push(newValue);

    // this.validarItemsadd(this.dataChanged)
  }

  onInputChangedStorage(
    value: string,
    rowIndex: number,
    propertyKey: string
  ): void {
    // this.quantity = value;
    this.dataChanged = [];

    const newValue = this.detalleProductList.map((row, index) => {
      return index !== rowIndex ? row : { ...row, [propertyKey]: value };
    });
    this.dataChanged.push(newValue);

    // this.validarItemsadd(this.dataChanged)
  }

  AddProduct(): void {
    // this.validarItemsEditable(this.valuedContador);

    this.articles = [];
    this.articSearch = '';

    this.valuedContador.map((articCont) => {
      this.detalleProduct.push({
        idReferenciaOrdenCompra: 0,
        idOrdenCompra: 0,
        idItem: parseInt(articCont.IdItem),
        cantidad: 0,
        StorageArea: '',
        valorUnitario: parseInt(articCont.valorUnitario),
        loteNum: '',
        disponible: 0,
        reserva: 0,
        transito: 0,
        item: articCont.item,
        origen: articCont.origen,
      });
      this.detalleProductList = this.concatenardatos(this.detalleProduct);
    });

    console.log(this.detalleProductList);
    this.valuedContador = [];
    this.tablaConItems = true;
    $('#filterModal').modal('hide');
  }

  deleteArticulo(idArti): void {
    const array = [];
    for (var i = 0; i < this.detalleProductList.length; i++) {
      this.detalleProductList[i]['idReal'] = i;
      array.push(this.detalleProductList[i]);
    }
    var articulo = array.filter(function (artic) {
      return artic.idReal !== idArti;
    });
    this.detalleProductList = articulo;
    let sum = 0;
    this.detalleProductList.map((item) => {
      sum = parseInt(item.Quantity) - sum;
    });
    this.pesoBruto = sum;
  }

  validar(inven) {
    console.log(inven);
    console.log(this.dataChanged[0]);
    // this.valuedContador = [];

    const unicos = [];

    this.dataChanged[0].map((arti) => {
      console.log(arti);
      if (arti.idItem == inven.idItem) {
        arti.editable = '';
        arti.totalPrecio =
          parseInt(arti.Quantity) * parseInt(arti.valorUnitario);
        arti.loteNum = inven.loteNum;
        this.dataChanged[0].push(arti);
      }
    });

    for (var i = 0; i < this.dataChanged[0].length; i++) {
      const elemento = this.dataChanged[0][i];

      if (!unicos.includes(this.dataChanged[0][i])) {
        unicos.push(elemento);
      }
    }
    this.dataChanged[0] = unicos;

    this.detalleProductList = this.dataChanged[0];
    let sum = 0;
    this.detalleProductList.map((item) => {
      sum += parseInt(item.Quantity);
    });

    this.pesoBruto = sum;

    // for (const i of Object["values"](inven)) {
    //   // i["editable"] = `${""}`;
    //   // this.valuedContador.push(i);
    // }
  }

  validarEstadoString(status) {
    if (status == '1') {
      this.statusFormDo = 'PROGRAMMING';
    } else if (status == '2') {
      this.statusFormDo = 'CLEAR';
    } else if (status == '3') {
      this.statusFormDo = 'In Transit';
    } else {
      this.statusFormDo = 'CANCELED';
    }
  }
  inactivar(item) {
    this.Activartodos = true;
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
  }
  activar() {
    this.Activartodos = false;
    this.Warehouse = true;
    this.Total = true;
    this.Reserved = true;
    this.Transit = true;
    this.Available = true;
    this.Lot = true;
    this.Class = true;
    this.Name = true;
    formatNumber;
  }
}
