import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAction } from 'src/data/modelos/controles/IAction';
import { Articulos } from 'src/data/modelos/controles/articulos'
import { ArticlesService } from 'src/app/shared/services/articles/articles.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { MaestrosService } from 'src/app/shared/services/articles/maestros.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from "ngx-spinner";


declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  selectedImage: any;
  imagen: any;
  ocultarImagen: boolean = true;
  subidaImagen: boolean = false;
  imagenBase64: any;
  imagentoarraysave: any;
  objectType: any;
  imagenSubida;
  selectedFiles: FileList | any;

  //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  // progressInfo = []
  // message = '';
  fileName = "";
  fileInfos: any;
  subirImagen: boolean = false;
  //datos
  idItem = 0;
  sku: any
  descripcion: any
  costoUnitario: any
  peso: any
  ancho: any
  alto: any
  volumen: any
  patronEstiba: any
  marca: any
  cod: any
  clasificacion: any
  embalaje: any
  ean: any
  largo: any
  posicion_principal: any
  foto: any
  observation: any
  estado: any;
  proceso = 'GET';
  parameterClasificacion: any;
  parameterMarca: any;
  Clasificacion: any;
  Marca: any;
  proccess: any;
  subcategoryList: any;
  detallesArticulos: any[];
  idI: any;
  parameterUnidad: any;
  parameterSub: any;
  parameterSubCategory: any;
  origin: any;
  varietal: any;
  subcategory: any;
  pullingNote: any;
  process: any;
  unidad: any;
  detallesunidades: any[];
  detallesPrecio: any[];
  parameteVariedad: any;
  pagination: number = 1;
  subessearch: any;
  originlist: any;
  score: any;
  horaActual: any
  cuppingNote: any
  parameterOrigin: any;
  mostrarselc: boolean = true;
  embalajeList: any;
  MostrarAdd: boolean = true;
  parameterprice: any;
  listaPrecio: any;
  listOfPrice: any[];
  mostrarSubir: boolean = false;
  imagenes: any[];
  constructor(public inventario: ArticlesService,
    public maestros: MaestrosService,
    public storage: AngularFireStorage,
    private activatedRoute: ActivatedRoute,
    private router: Router, public authFire: AngularFireAuth,
    private spinner: NgxSpinnerService) {
    this.detallesunidades = [];
    this.detallesPrecio = [];
    this.listOfPrice = [];
    this.initParameter();

    this.activatedRoute.params.subscribe(Params => {

      this.idI = Params['id'];
      if (this.idI == 0) {
      } else {
        this.spinner.show();
        this.SetArticulos()
        // this.contadorHide = true;
        // this.getInventarioConteo(this.sku);
      }

    });

  }


  ngOnInit(): void {
    this.initvalue();
    this.InitFireBase();
    this.horaActual = moment().format()
  }

  private InitFireBase() {


    this.authFire.signInWithEmailAndPassword(
      "abako@ditosas.com",
      "abako123"
    );

  }

  initParameter() {
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

    this.parameterClasificacion = {
      idClasificacion: 0,
      descripcion: '',
      codigo: ''
    }

    this.parameterMarca = {
      idMarca: 0,
      descripcion: '',
      codigo: ''
    }

    this.parameterUnidad = {
      idUnidadEmpaque: 0,
      descripcion: '',
      activo: ''
    }

    this.parameterSub = {
      idProcesoItem: 0,
      codigo: "",
      descripcion: ""
    }
    this.parameterSubCategory = {
      idSubCategoria: 0,
      codigo: "",
      descripcion: ""
    }
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

    this.parameterprice = {
      idListaPrecio: 0,
      descripcion: '',
      codigo: ''
    }

    this.maestros.getListPrice(this.parameterprice, 'GET').subscribe((clas) => {
      this.listaPrecio = clas.listaPrecios;
    });
  }

  setArticles(datos) {


    this.inventario.GuardarArticulo(datos, 'GET').subscribe((arti) => {

      this.getMostrar(arti.items)
      //  location.reload()
    })
  }

  initvalue() {
    this.maestros.getClasificacion(this.parameterClasificacion, this.proceso).subscribe((clas) => {
      this.Clasificacion = clas.clasificaciones;
    });

    this.maestros.getMarca(this.parameterMarca, this.proceso).subscribe((marc) => {
      this.Marca = marc.marcas;
    });


    this.maestros.getUnidadEmpaque(this.parameterUnidad, 'GET').subscribe((marc) => {
      this.unidad = marc.unidadesEmpaque;
    });

    this.maestros.getProcess(this.parameterSub, 'GET').subscribe((sub) => {
      this.proccess = sub.procesosItem;
      this.proccess.forEach(eleme => {
        eleme["datos"] = `${eleme["codigo"]} - ${eleme["descripcion"]} `;
      });
    });

    this.maestros.getSubCategory(this.parameterSubCategory, 'GET').subscribe((sub) => {
      this.subcategoryList = sub.subCategorias;

    });

    this.maestros.getVariedad(this.parameteVariedad, 'GET').subscribe((sub) => {
      this.subessearch = sub.variedadesItem;
    });

    this.maestros.getOrigin(this.parameterOrigin, 'GET').subscribe((sub) => {
      this.originlist = sub.origenesItem;
    });
  }

  imgAccordion(event: any) {
    event.target.files.length == 1 ? this.fileName = event.target.files[0].name : this.fileName = event.target.files.length + " archivos";
    this.selectedFiles = event.target.files;
    this.mostrarSubir = true
    
  }

  subirImagenes() {

    this.imagenes = [];
    for (const i of Object["values"](this.selectedFiles)) {
      var filePath = `Upload/ImagenProductos${i['name']
        }_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage
        .upload(filePath, i)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.imagenes.push(
                {
                  idImagenItem: 0,
                  idItem: this.idItem,
                  imagen: url
                }
            ,
              )
            });
          })
        )
        .subscribe();
    }
    this.mostrarSubir = false
    Swal.fire(
      'succes!',
      'images uploaded successfully!',
      'success'
    )
    console.log(this.imagenes)

  }

  AddListPrice(){

    var detallePrecio = {
      idPrecioItem: 0,
      idListaPrecio: 0,
      idItem: this.idItem,
      precio: 0
    }
  this.detallesPrecio.push(detallePrecio)
  }

  cerrar(idArti): void {

    var arrayList = Array.from(this.selectedFiles);
    var array = [];
    for (var i = 0; i < arrayList.length; i++) {
      arrayList[i]['idReal'] = i
      array.push(arrayList[i])
    }

    var articulo =

      array.filter(function (artic) {
        return artic.idReal !== idArti;
      });
      this.selectedFiles = articulo;
    
  }


  actionExecuted(event): void {
    switch (event.description) {
      case "Cancel":
        // this.abrirArticulo(paramevents.id);
        location.reload()
        break;

      case "Save":
        this.articulosguardar();
        break;

      default:
        throw new Error(`No existe la acción ${event.action} en la bandeja`);
    }

  }

  detalle() {

    $('#editMark').modal('show')
  }

  agregarProducto(datos, imagen) {
    if (this.validarEnvioAGuardar(datos)) {
      if (this.selectedFiles == undefined) {
        var proceso = "INS";
        this.inventario.GuardarArticulo(datos, proceso).subscribe((arti) => {
          this.spinner.hide();
          if (arti.mensaje.msgId == -1) {
            Swal.fire(
              'error!',
              'SKU field already exists!',
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
          //  location.reload()
        })
      } else if (this.selectedFiles && this.imagenes == undefined) {
        Swal.fire(
          'Info!',
          'You have not uploaded the images to the server!',
          'info'
        )
      } else if (this.selectedFiles && this.imagenes) {
        var proceso = "INS";
        this.inventario.GuardarArticulo(datos, proceso).subscribe((arti) => {
          this.spinner.hide();
          if (arti.mensaje.msgId == -1) {
            Swal.fire(
              'error!',
              'SKU field already exists!',
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
          //  location.reload()
        })
      }


    }
    else {
      Swal.fire(
        'error!',
        'Required fields are mandatory!',
        'error'
      )
    }


  }


  EditarProducto(datos, imagen) {
    if (this.selectedFiles == undefined) {
      var proceso = "UPD";
      this.inventario.GuardarArticulo(datos, proceso).subscribe((arti) => {
        if (arti.mensaje.msgId == -1) {
          Swal.fire(
            'error!',
            'SKU field already exists!',
            'error'
          )
        } else {
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
        }

      })
    } else if (this.selectedFiles && this.imagenes == undefined) {
      Swal.fire(
        'Info!',
        'You have not uploaded the images to the server!',
        'info'
      )
    } else if (this.selectedFiles && this.imagenes) {
      var proceso = "UPD";
      this.inventario.GuardarArticulo(datos, proceso).subscribe((arti) => {
        if (arti.mensaje.msgId == -1) {
          this.spinner.hide();
          Swal.fire(
            'error!',
            'SKU field already exists!',
            'error'
          )
        } else {
          this.spinner.hide();
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
        }

      })
    }



  }

  articulosguardar(): void {
    this.spinner.show();
    if (this.idI == 0) {
      if (this.embalaje == undefined) {
        Swal.fire(
          'error!',
          'The Packaging field is empty !',
          'error'
        )
      } else {
        this.embalaje.map((unid) => {
          this.detallesunidades.push({
            idReferenciaUnidadItem: 0,
            idItem: 0,
            idUnidadEmpaque: unid.idUnidadEmpaque,
            conversion: 0,
            codigo: unid.descripcion,
            peso: unid.peso,
            largo: unid.largo,
            ancho: unid.ancho,
            alto: unid.alto
          });
        });
        // console.log(this.listOfPrice)
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        const parameters: Articulos = {
          idItem: 0,
          sku: this.sku,
          descripcion: this.descripcion,
          alto: 0,
          ancho: 0,
          codigoInternoPMI: "test",
          ean: this.ean,
          // embalaje: this.embalaje,
          estado: "1",
          largo: 0,
          fechaModificacion: "2021-09-22T20:21:20.149Z",
          idClasificacion: parseInt(this.clasificacion),
          idMarca: parseInt(this.marca),
          idUsuarioModificacion: 61,
          imagen: '',
          observacion: this.observation,
          patronEstiba: 0,
          peso: 0,
          puntaje: parseInt(this.score),
          posicionPrincipal: "test",
          calificacionCata: this.cuppingNote,
          idProcesoItem: parseInt(this.process),
          idSubCategoria: parseInt(this.subcategory),
          idOrigenItem: parseInt(this.origin),
          idVariedadItem: parseInt(this.varietal),
          posiciones: [
          ],
          unidadesEmpaque: this.detallesunidades,
          valorUnitario: this.costoUnitario,
          imagenes: this.imagenes,
          precios: this.detallesPrecio
        }
       this.agregarProducto(parameters, this.selectedImage)
      }

    } else {
      this.parameterArticle(this.idI)
    }
  }

  getArticulos(): void {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const parameters: Articulos = {
      idItem: this.idItem,
      sku: this.sku,
      descripcion: this.descripcion,
      alto: this.alto,
      ancho: this.ancho,
      codigoInternoPMI: this.cod,
      ean: this.ean,
      embalaje: this.embalaje,
      estado: this.estado,
      largo: this.largo,
      fechaModificacion: "2021-09-22T20:21:20.149Z",
      idClasificacion: parseInt(this.clasificacion),
      idMarca: parseInt(this.marca),
      idUsuarioModificacion: 0,
      imagen: '',
      observacion: this.observation,
      patronEstiba: this.patronEstiba,
      peso: this.peso,
      posicionPrincipal: this.posicion_principal,
      posiciones: [
      ],
      unidadesEmpaque: [
      ],
      valorUnitario: this.costoUnitario
    }
    // this.getArticulosService(parameters);
  }

  borrarPricelist(idIndex): void {

  
    var array = [];
    for (var i = 0; i < this.detallesPrecio.length; i++) {
      this.detallesPrecio[i]['idReal'] = i
      array.push(this.detallesPrecio[i])
    }

    var price =  array.filter(function (artic) {
        return artic.idReal !== idIndex;
      });
      this.detallesPrecio = price;
  }

  SetArticulos(): void {
    const parameters: Articulos = {
      idItem: parseInt(this.idI),
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

  parameterArticle(id) {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    this.embalaje.map((unid) => {
      this.detallesunidades.push({
        idReferenciaUnidadItem: 0,
        idItem: parseInt(id),
        idUnidadEmpaque: unid,
        conversion: 0,
        codigo: unid.descripcion,
        peso: unid.peso,
        largo: unid.largo,
        ancho: unid.ancho,
        alto: unid.alto
      });
    });
    const parameters: Articulos = {
      idItem: parseInt(id),
      sku: this.sku,
      descripcion: this.descripcion,
      alto: 0,
      ancho: 0,
      codigoInternoPMI: 'tes',
      ean: this.ean,
      embalaje: 0,
      estado: this.estado,
      largo: 0,
      puntaje: parseInt(this.score),
      fechaModificacion: "2021-09-22T20:21:20.149Z",
      idClasificacion: parseInt(this.clasificacion),
      idMarca: parseInt(this.marca),
      idProcesoItem: parseInt(this.process),
      idSubCategoria: parseInt(this.subcategory),
      idOrigenItem: parseInt(this.origin),
      idVariedadItem: parseInt(this.varietal),
      idUsuarioModificacion: 61,
      imagen: '',
      observacion: this.observation,
      calificacionCata: this.cuppingNote,
      patronEstiba: parseInt(this.patronEstiba),
      peso: 0,
      posicionPrincipal: this.posicion_principal,
      posiciones: [
      ],
      unidadesEmpaque: this.detallesunidades,
      valorUnitario: parseInt(this.costoUnitario),
      imagenes: this.imagenes,
      precios: this.detallesPrecio
    }

    this.EditarProducto(parameters, this.selectedImage)
  }

  validarItems(detalleArt) {

    this.detallesArticulos = [];
    let inicio = 0;
    for (const i of Object["values"](detalleArt)) {
      i["descripcion"] = `${i["Descripción"]}`;
      i["codigoInternoPMI"] = `${i["Cod. Int. PMI"]}`;
      i["observacion"] = `${i["Observación"]}`;
      i["posicionPrincipal"] = `${i["Posición Principal"]}`;
      i["patronEstriba"] = `${i["Patrón Estiba"]}`;
      i["valorUnitario"] = `${i["Costo Unitario"]}`;
      i["classification"] = `${i["Clasificación"]}`;
      i["CalificacionCata"] = `${i["Calificación Cata"]}`;

      this.detallesArticulos.push(i);
    }
    this.getMostrar(this.detallesArticulos[0]);
  }

  validarEnvioAGuardar(datos) {


    // if (datos.sku == undefined) {

    //   return false;
    // }

    if (datos.descripcion == undefined) {

      return false;
    }

    if (datos.idProcesoItem == undefined) {

      return false;
    }
    if (datos.idClasificacion == undefined) {

      return false;
    }

    if (datos.idOrigenItem == undefined) {

      return false;
    }

    if (datos.idVariedadItem == undefined) {

      return false;
    }

    if (datos.unidadesEmpaque == undefined) {
      return false;
    }


    return true;

  }

  getMostrar(arti) {
    this.MostrarAdd = false;
    this.idItem = arti[0].idItem;
    this.sku = arti[0].sku;
    this.descripcion = arti[0].descripcion;
    this.alto = arti[0].Alto;
    this.ancho = arti[0].Ancho;
    this.cod = arti[0].codigoInternoPMI;
    this.ean = arti[0].ean;
    this.score = arti[0].puntaje;
    // this.embalaje = arti[0].Embalaje;
    this.estado = arti[0].estado;
    this.largo = arti[0].Largo;
    this.clasificacion = arti[0].classification;
    this.marca = arti[0].Marca;
    this.selectedFiles = arti[0].imagenes;
    this.imagenes = arti[0].imagenes;
    this.observation = arti[0].observacion;
    this.patronEstiba = arti[0].patronEstriba;
    this.peso = arti[0].Peso;
    this.posicion_principal = arti[0].posicionPrincipal;
    this.cuppingNote = arti[0].calificacionCata;
    this.volumen = arti[0].Volumen;
    this.origin = arti[0].idOrigenItem;
    this.varietal = arti[0].idVariedadItem
    this.process = arti[0].idProcesoItem;
    this.marca = arti[0].idMarca;
    this.clasificacion = arti[0].idClasificacion;
    this.costoUnitario = arti[0].valorUnitario;

    this.embalaje = [];
    this.detallesPrecio = arti[0].precios;
    this.embalajeList = arti[0].unidadesEmpaque;
    this.mostrarselc = false;
    // this.detallesunidades = arti[0].unidadesEmpaque;
    arti[0].unidadesEmpaque.map((uni) => {

      this.embalaje.push(uni.idUnidadEmpaque
      );
    })
    this.spinner.hide();
   

  }

  activar(): void {
    $('.popover-dismiss').popover({
      trigger: 'focus'
    })
  }

}
