import { Component, Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ArticlesService } from 'src/app/shared/services/articles/articles.service';
import { MaestrosService } from 'src/app/shared/services/articles/maestros.service';
import { displayedColumnsDetalleArticulo } from 'src/data/baseData/dataInventory/dataInventory';
import { Articulos } from 'src/data/modelos/controles/articulos';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-grid-table-base',
  templateUrl: './grid-table-base.component.html',
  styleUrls: ['./grid-table-base.component.css']
})
export class GridTableBaseComponent implements OnInit {
  @Input() source: any;
  @Input() columns = [];
  getColumn;
  page = 1;
  pageSize = 4;
  collectionSize: any;
  articles: any;
  detailProduct: any;
  countries: Articulos[];
  articSearch: any;
  pagination: number = 1;
  mostrar: boolean = false;
  searclist: boolean = true;
  returnList: boolean = false;
  searchArticulo: any;
  itemsPages: number = 5;
  embalajeList: any;
  priceList: any;
  parameterprice : any;
  listaPrecio : any;
  listImagene: any;
  get displayedColumns(): string[] { return this.columns.map(c => c.name); }
  constructor(public inventario: ArticlesService,
     private router: Router, 
     private storage: AngularFireStorage,
     public maestros: MaestrosService) {
      this.parameterprice ={
        idListaPrecio: 0,
        descripcion: '',
        codigo: ''
      }

  }

  ngOnInit(): void {
    $('a[download]').each(function() {
      var $a = $(this),
          fileUrl = $a.attr('href');

      $a.attr('href', 'data:application/octet-stream,' + encodeURIComponent(fileUrl));

      
    });
    
    const parameter = {
      idBandeja: '3',
      busqueda: ''
    }

    this.inventario.searchArticles(parameter).subscribe((res) => {
      this.articles = res.data;
      this.searchArticulo = res.data;
      if (this.articles.length == 0) {
        this.mostrar = true;
      } else {
        this.mostrar = false;
      }

      this.validarItemsSearch(res.data);
      this.collectionSize = this.articles.length;
      this.refreshCountries();
    });
  }

  filter() {
    const parameter = {
      idBandeja: '3',
      busqueda: this.articSearch
    }

    this.inventario.searchArticles(parameter).subscribe((res) => {
      this.articles = res.data;
      if (this.articles.length == 0) {
        this.mostrar = true;
        this.returnList = true;
      } else {
        this.mostrar = false;
        this.returnList = true;
      }

      this.validarItemsSearch(res.data);
      this.collectionSize = this.articles.length;
      this.refreshCountries();
    });
  }
  limpiar() {
    this.validarItemsSearch(this.searchArticulo);
    this.searclist = true;
    this.returnList = false;
    this.mostrar = false;
    this.articSearch = '';
  }

  refreshCountries() {
    this.countries = this.articles
      .map((article, i) => ({ idItem: i + 1 }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  VerDetalle(datos) {
    this.detailProduct = datos;
   const parameters = this.validarItems(datos);
    this.inventario.GuardarArticulo(parameters, 'GET').subscribe((arti) => {
      console.log(this.listaPrecio);
       this.embalajeList = arti.items[0].unidadesEmpaque;
        this.priceList = arti.items[0].precios;
        this.listImagene = arti.items[0].imagenes;
     
      $('#staticBackdrop').modal('show')
      //  location.re load()
    })
  }

  validarItems(i){
    this.maestros.getListPrice(this.parameterprice,'GET').subscribe((clas)=>{
     
      this.listaPrecio = clas.listaPrecios;
    });
    const parameters: Articulos = {
      idItem: parseInt(i.IdItem),
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

    return parameters;
    // });
    
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
      i["SubCategoria"] = `${i["SubCategoría"]}`;
      i['CantidadImagenes'] = `${i["Cantidad Imagenes"]}`;
      this.articles.push(i);
    }
    this.articles.reverse()



  }

  abrirArticulo(dato) {
    this.router.navigate([`dashboard/articles/${dato.IdItem}`], { skipLocationChange: true });
  }

  imagen(image: any) {
    const parameters: Articulos = {
      idItem: parseInt(image.IdItem),
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
  }

 
  setArticles(datos) {
    this.inventario.GuardarArticulo(datos, 'GET').subscribe((arti) => {
      this.detailProduct = arti.items;
      this.listImagene = arti.items[0].imagenes;
      console.log(this.listImagene)
      $('#previewIma').modal('show')
      //  location.re load()
    })
  }

//  DownloadImage(imageURL) {

//     var oImage = document.getElementById(imageURL);
//     var canvas = document.createElement("canvas");
//     document.body.appendChild(canvas);
//     if (typeof canvas.getContext == "undefined" || !canvas.getContext) {
//         alert("browser does not support this action, sorry");
//         return false;
//     }

//     try {
//         var context = canvas.getContext("2d");
//         var width = oImage.width;
//         var height = oImage.height;
//         canvas.width = width;
//         canvas.height = height;
//         canvas.style.width = width + "px";
//         canvas.style.height = height + "px";
//         context.drawImage(oImage, 0, 0, width, height);
//         var rawImageData = canvas.toDataURL("image/png;base64");
//         rawImageData = rawImageData.replace("image/png", "image/octet-stream");
//         document.location.href = rawImageData;
//         document.body.removeChild(canvas);
//     }
//     catch (err) {
//         document.body.removeChild(canvas);
//         alert("Sorry, can't download");
//     }

//     return true;
// }


  deleteArticulo(id): void {
    const parameters: Articulos = {
      idItem: parseInt(id),
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
    this.deleteArticles(parameters);
  }

  deleteArticles(datos) {
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

        this.inventario.GuardarArticulo(datos, 'DEL').subscribe((marc) => {
          if (marc.mensaje.msgId == -1) {
            Swal.fire(
              'Not Deleted!',
              'The data cannot be deleted because it is associated with other records. ',
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
}
