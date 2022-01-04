import { Component, OnInit, ViewChild } from '@angular/core';
import { MaestrosService } from 'src/app/shared/services/articles/maestros.service';
import { LoginService } from 'src/app/shared/services/auth/login.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import Swal from 'sweetalert2';
// import { GroupByPipe } from './group-by.pipe';

import * as XLSX from 'xlsx';
declare var $: any;
export interface PeriodicElement {
  almacen: string;
  bodega: string;
  centroDistribucion: string;
  marca: string;
  clasificacion: string;
  sku: string;
  item: string;
  cantidad: number;
  transito: number;
  tiempo: string;
  valorUnitario: number;
  costoTotal: number;
  precioUnitario: number;
  precioTotal: number;
  fechaModificacion: string;
}

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  // pipes: [GroupByPipe],
})
export class InventoryListComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  @ViewChild(MatAccordion) accordion: MatAccordion;
  fileName = 'inventoryList.xlsx';
  pagination: number = 1;
  itemsPages: number = 5;
  paginationCampo: number = 1;
  itemsPagescampo: number = 5;
  paginationClassifi: number = 1;
  itemsPagesClassifi: number = 5;
  itemsPagesBrand: number = 1;
  paginationBrand: number = 5;
  returnList: boolean = false;
  statusFormDo: string;
  jerarquiaUser: any = [];
  estatusList: any = [];
  style = 'ACTIVO';
  intro = '';
  nameAlmacen: any;
  id = '%20';
  namesearch: any;
  nameEstado: any;
  articles: any;
  idStado = '1,0';
  search: any;
  recuperarSearch: any;
  idBodega = '%20';
  idDistribucion;
  idMarca = '%20';
  idClasificacion = '%20';
  masmenos: boolean = true;
  parameterMarca;
  Marca;
  parameterClasificacion;
  panelOpenState = false;
  Clasificacion;
  CamposTabla = [
    // { name: "Name", id: 1, show: 1 },
    { name: 'Distribution Center', id: 2, show: 0 },
    { name: 'Warehouse', id: 3, show: 1 },
    { name: 'Class', id: 4, show: 1 },
    { name: 'Available', id: 5, show: 1 },
    { name: 'Transit', id: 6, show: 1 },
    { name: 'Reserve', id: 7, show: 1 },
    { name: 'Time', id: 8, show: 0 },
    { name: 'SKU', id: 9, show: 0 },
    { name: 'Total cost', id: 10, show: 0 },
    { name: '# Lot', id: 11, show: 1 },
    { name: 'Brand', id: 12, show: 0 },
    { name: 'Total Price', id: 13, show: 0 },
    { name: 'Unit Price', id: 14, show: 0 },
    { name: 'Unit Value', id: 15, show: 0 },
    { name: 'Total', id: 16, show: 1 },
  ];
  valuedContador: any;
  clasificacion: any;
  brand: any;
  ListaMarca;
  ListaMarcaKeys;
  ArrayUnidos;
  itemSeleccionado;
  dataSource: any[];
  displayedColumns: string[] = [
    'distributionCenter',
    'warehouse',
    'class',
    'quantity',
    'transit',
    'time',
    'sku',
  ];
  columnsToDisplay = ['Name'];
  expandedElement: PeriodicElement | null;
  step = 0;
 

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(
    public loginservice: LoginService,
    public maestros: MaestrosService
  ) {
    this.statusFormDo = 'Almacen 1';
    this.clasificacion = [];
    this.brand = [];
    this.valuedContador = [];
    this.estatusList = [
      { idStatus: 1, name: 'Active' },
      { idStatus: 0, name: 'Inactive' },
    ];
    this.action = [
      {
        description: 'Filter',
        icon: 'mdi mdi-filter',
      },
      {
        description: 'Refresh',
        icon: 'mdi mdi-refresh',
      },
      {
        description: 'Export',
        icon: 'mdi mdi-file-export',
      },
      {
        description: 'Fields to table',
        icon: 'mdi mdi-table-column-plus-before',
      },
    ];
  }
  isGroup(index, item): string {
    return item.isGroupBy;
  }
  ngOnInit(): void {
    this.jerarquiaUser = JSON.parse(this.loginservice.getTokenJeraquia());
    this.idDistribucion = this.jerarquiaUser[0].idCentroDistribucion;
    this.filtrar();
  }

  
  beforePanelClosed(panel){

    panel.isExpanded = false;
    console.log("Panel going to close!");
  }
  beforePanelOpened(panel){
   
    panel.isExpanded = true;
    console.log("Panel going to  open!");
  }

  afterPanelClosed(panel){
    console.log("Panel closed!");
  }
  afterPanelOpened(pane){
    console.log("Panel opened!");
  }


  closeAllPanels(){
    const expanded = [];
    this.ArrayUnidos.map((Expa)=>{
      Expa.isExpanded = false;
      expanded.push(Expa)
    })
    this.ArrayUnidos = this.concatenardatos(expanded)
    this.accordion.closeAll();
  }
  openAllPanels(){
   
    const expanded = [];
    this.ArrayUnidos.map((Expa)=>{
      Expa.isExpanded =true
      expanded.push(Expa)
    })
    this.ArrayUnidos = this.concatenardatos(expanded)
    this.accordion.openAll();
    
  
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

  filtrar() {
    const paramet = {
      idUsuario: 61,
      busqueda: '%20',
      idCentroDistribucion: this.idDistribucion,
      idBodega: this.idBodega,
      idAlmacen: this.id,
      estado: this.idStado,
      IdMarcas: this.idMarca,
      IdClasificacion: this.idClasificacion,
    };

    this.maestros.getInventario(paramet).subscribe((resp) => {
      if (resp.inventario.length == 0) {
        Swal.fire({
          title: 'No inventory associated',
          showClass: {
            popup: 'animate__animated animate__fadeInLeft',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutRight',
          },
        });
      } else {
        this.dataSource = resp.inventario;

        this.OrderbyObjec(this.dataSource);

        this.recuperarSearch = resp.inventario;
      }
    });
  }

  OrderbyObjec(object: any): any {
    this.ListaMarcaKeys = [];
    var invent = object.reduce(function (r, a) {
      r[a.item] = r[a.item] || [];
      r[a.item].push(a);
      return r;
    }, Object.create(null));

    this.ListaMarca = Object.values(invent);
    const keysvalue = Object.keys(invent);
    keysvalue.map((element) => {
      this.ListaMarcaKeys.push({
        name: element,
      });
    });

    this.unirObjectosHijos(this.ListaMarcaKeys);
    // this.ListaMarcaKeys = keysvalue;
  }

  unirObjectosHijos(padres) {
    const unidos = [];
    padres.map((padre) => {
      padre.hijos = this.dataSource.filter((item) => item.item == padre.name);
      unidos.push(padre);
    });
    this.validarItemsSearch(unidos);
    // this.ArrayUnidos = unidos;
  }

  cargarMarca() {
    this.parameterMarca = {
      idMarca: 0,
      descripcion: '',
      codigo: '',
    };
    this.maestros.getMarca(this.parameterMarca, 'GET').subscribe((marc) => {
      this.Marca = marc.marcas;
    });
  }

  cargarClasificacion() {
    this.parameterClasificacion = {
      idClasificacion: 0,
      descripcion: '',
      codigo: '',
    };
    this.maestros
      .getClasificacion(this.parameterClasificacion, 'GET')
      .subscribe((clas) => {
        this.Clasificacion = clas.clasificaciones;
      });
  }

  mostrarDetalle(iten) {
    // this.itemSeleccionado = iten;
    // if (this.itemSeleccionado === iten) {
    //   matExpansionPanel.expanded = true;
    // } else {
    //   matExpansionPanel.expanded = false;
    // }
    //  matExpansionPanel.expanded = true;
    //  event.stopPropagation();
    const itemsde = this.dataSource.filter((item) => item.item == iten);
    this.validarItemsSearch(itemsde);
    // this.articles = itemsde;
  }
  validarItemsSearch(inven) {
    
    this.ArrayUnidos = [];
    const detalles = [];
    inven.forEach((i) => {
      i.isDisabled =false,
      i.isExpanded =false
      let sum = 0;
      let sumAvailable = 0;
      let sumTansit= 0;
      let sumReserve = 0;
      i.hijos.forEach((elemHijos) => {
     
        if (i.name === elemHijos.item) {
          sum += parseInt(elemHijos.total);
          sumAvailable += parseInt(elemHijos.cantidad);
          sumTansit += parseInt(elemHijos.transito)
          sumReserve += parseInt(elemHijos.reserva)
        }
        i.totalAvailable =  sumAvailable;
        i.totalTransit = sumTansit;
        i.totalReserve = sumReserve;
        i.totales = sum;
        const keysvalue = Object.keys(elemHijos);
        this.CamposTabla.forEach((element) => {
          if (element.name == 'Distribution Center' && keysvalue[0]) {
            i['showDistribution'] = `${element['show']}`;
          }
          if (element.name == 'Warehouse' && keysvalue[1]) {
            i['showWarehouse'] = `${element['show']}`;
          }
          if (element.name == 'Class' && keysvalue[4]) {
            i['showClass'] = `${element['show']}`;
          }
          if (element.name == 'Available' && keysvalue[11]) {
            i['showQuantity'] = `${element['show']}`;
          }
          if (element.name == 'Transit' && keysvalue[12]) {
            i['showTransit'] = `${element['show']}`;
          }
          if (element.name == 'Reserve' && keysvalue[13]) {
            i['showReserve'] = `${element['show']}`;
          }
          if (element.name == 'Name' && keysvalue[6]) {
            i['showName'] = `${element['show']}`;
          }
          if (element.name == 'Time' && keysvalue[14]) {
            i['showTime'] = `${element['show']}`;
          }
          if (element.name == 'SKU' && keysvalue[5]) {
            i['showSKU'] = `${element['show']}`;
          }

          if (element.name == 'Brand' && keysvalue[3]) {
            i['showBrand'] = `${element['show']}`;
          }
          if (element.name == 'Unit Price' && keysvalue[7]) {
            i['showUnitPrice'] = `${element['show']}`;
          }
          if (element.name == 'Total Price' && keysvalue[10]) {
            i['showTotalPrice'] = `${element['show']}`;
          }
          if (element.name == 'Total cost' && keysvalue[8]) {
            i['showTotalCost'] = `${element['show']}`;
          }
          if (element.name == 'Unit Value' && keysvalue[9]) {
            i['showUnitValue'] = `${element['show']}`;
          }
          if (element.name == 'Total' && keysvalue[14]) {
            i['showTotal'] = `${element['show']}`;
          }

          if (element.name == '# Lot' && keysvalue[17]) {
            i['showLot'] = `${element['show']}`;
          }
        });
      });
      this.ArrayUnidos.push(i);
    });
    console.log(this.ArrayUnidos)
    // this.articles.reverse()
  }

  searchinto(search) {
    const paramet = {
      idUsuario: 61,
      busqueda: search,
      idCentroDistribucion: this.idDistribucion,
      idBodega: this.idBodega,
      idAlmacen: this.id,
      estado: this.idStado,
      IdMarcas: this.idMarca,
      IdClasificacion: this.idClasificacion,
    };

    this.maestros.getInventario(paramet).subscribe((resp) => {
      this.dataSource = resp.inventario;

      this.OrderbyObjec(this.dataSource);

      this.recuperarSearch = resp.inventario;

      if (resp.inventario.length == 0) {
        this.returnList = true;
      } else {
        this.search = '';
      }
    });
  }
  checkPush(ev) {
    if (!ev.target.checked) {
      const valued = this.jerarquiaUser.filter(
        (x) => x.idAlmacen == ev.target.value
      );
      valued.map((contad) => {
        var indice = this.valuedContador.indexOf(contad.idAlmacen);
        this.valuedContador.splice(indice, 1);
      });
    } else {
      const valued = this.jerarquiaUser.filter(
        (x) => x.idAlmacen == ev.target.value
      );
      valued.map((contad) => {
        this.valuedContador.push(contad);
      });
      var unidod = '';
      var bodega = '';
      var centro = '';
      this.valuedContador.map((unid) => {
        unidod += unid.idAlmacen + ',';
        bodega = unid.idBodega;
        centro = unid.idCentroDistribucion;
      });
      // this.id = unidod
      this.idBodega = bodega;
      // this.idDistribucion = centro;
    }
  }

  checkPushdistribut(ev) {
    if (!ev.target.checked) {
      const valued = this.jerarquiaUser.filter(
        (x) => x.centroDistribucion == ev.target.value
      );
      valued.map((contad) => {
        var indice = this.valuedContador.indexOf(contad.idAlmacen);
        this.valuedContador.splice(indice, 1);
      });
    } else {
      const valued = this.jerarquiaUser.filter(
        (x) => x.centroDistribucion == ev.target.value
      );
      valued.map((contad) => {
        this.valuedContador.push(contad);
      });
      var unidod = '';
      var bodega = '';
      var centro = '';
      this.valuedContador.map((unid) => {
        unidod += unid.idAlmacen + ',';
        bodega = unid.idBodega;
        centro = unid.idCentroDistribucion;
      });

      this.id = unidod;
      this.idBodega = bodega;
      this.idDistribucion = centro;
      //       idMarca
      // idClasificacion
    }
  }
  checkPusClassi(ev) {
    if (!ev.target.checked) {
      var indice = this.clasificacion.indexOf(ev.target.value);
      this.clasificacion.splice(indice, 1);
    } else {
      this.clasificacion.push(ev.target.value);

      var unidod = '';
      // var bodega = "";
      // var centro = ""
      this.clasificacion.map((unid) => {
        unidod += unid + ',';
      });

      this.idClasificacion = unidod;
    }
  }

  checkPusBrand(ev) {
    if (!ev.target.checked) {
      var indice = this.brand.indexOf(ev.target.value);
      this.brand.splice(indice, 1);
    } else {
      this.brand.push(ev.target.value);

      var unidod = '';
      // var bodega = "";
      // var centro = ""
      this.brand.map((unid) => {
        unidod += unid + ',';
      });

      this.idMarca = unidod;
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

  recuperar() {
    this.articles = this.recuperarSearch;
    this.returnList = false;
    this.search = '';
  }

  actionExecuted($event): void {
    switch ($event.description) {
      case 'Filter':
        this.modalFilter();
        // this.router.navigate(['dashboard/create-reservation', this.idbandeja ], { skipLocationChange: true });
        break;

      case 'Refresh':
        location.reload();
        // this.router.navigate(['dashboard/create-reservation', this.idbandeja ], { skipLocationChange: true });
        break;

      case 'Export':
        this.exportar();
        break;

      case 'Fields to table':
        this.camposNuevos();
        break;
    }
  }

  camposNuevos() {
    $('#campos').modal('show');
  }

  exportar() {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  aplicarCampos(){
   
    this.validarItemsSearch(this.ArrayUnidos)
 
    $('#campos').modal('hide')
  }

  mostrar(id, alamcen) {
    $('.product_point').removeClass('negativo');
    $('#product_' + id).addClass('negativo');
    this.nameAlmacen = alamcen;
    this.id = id;
  }

  mostrarEstad(id, estado) {
    $('.estado_point').removeClass('negativo');
    $('#estado_' + id).addClass('negativo');
    this.nameEstado = estado;
    this.idStado = id;
  }

  modalFilter() {
    $('#staticBackdrop').modal('show');
  }
}
