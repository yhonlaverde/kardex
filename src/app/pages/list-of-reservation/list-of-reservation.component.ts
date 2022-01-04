import { ConstantPool } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';
import { ArticlesService } from 'src/app/shared/services/articles/articles.service';
import { DocumentoService } from 'src/app/shared/services/articles/documento.service';
import { LoginService } from 'src/app/shared/services/auth/login.service';
import { IAction } from 'src/data/modelos/controles/IAction';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-list-of-reservation',
  templateUrl: './list-of-reservation.component.html',
  styleUrls: ['./list-of-reservation.component.scss'],
})
export class ListOfReservationComponent<t, k> implements OnInit, OnDestroy {
  action: IAction<t, k>[];
  id: number = 0;
  idbandeja: any;
  parameterSearch: any;
  articSearch: any;
  listInventory = [];
  pagination: number = 1;
  tipoDocumento: boolean = false;
  idDocumento: any;
  documentoBodega: any;
  itemsPages = 8;
  mostrar: boolean = false;
  searclist: boolean = true;
  citiessearch: any;
  returnList: boolean = false;
  searchfreight: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public loginservice: LoginService,
    public inventario: ArticlesService,
    public docm: DocumentoService
  ) {
    this.parameterInit();
    this.activatedRoute.params.subscribe((Params) => {
      this.idbandeja = Params['id'];
      console.log(this.idbandeja);
      if (this.idbandeja == 30) {
        this.tipoDocumento = true;
        this.idDocumento = 7;
      }
    });
  }

  ngOnInit(): void {
    this.parameterSearch = {
      idBandeja: this.idbandeja,
      busqueda: '',
      idUsuario: 61,
    };

    this.inventario.searchArticles(this.parameterSearch).subscribe((res) => {
      this.citiessearch = res.data;
      console.log(res.data);
      this.validarItems(res.data);
      // this.listInventory = ;
    });
  }

  ngOnDestroy(): void {
    // this.intervalSubs.unsubscribe();
  }

  parameterInit(): void {
    this.action = [
      {
        description: 'New',
        icon: 'mdi mdi-content-save',
      },
    ];
    // this.parameterSearch = {
    //   idBandeja: this.idbandeja,
    //   busqueda: "",
    //   idUsuario: 61
    // }

    // this.inventario.searchArticles(this.parameterSearch).subscribe((res) => {

    //   this.validarItems(res.data)
    //   // this.listInventory = ;
    // });
  }

  search(event) {
    if (event.target.value.length >= 3) {
      this.searchIntoData(event.target.value);
    } else {
      this.articSearch;
      Swal.fire({
        icon: 'error',
        title: 'You must enter more than 3 digits ',
        showConfirmButton: false,
        timer: 1700,
      });
      // this.MensajeAdvertenciaOut.emit('Debe digitar mas de 3 digitos.');
    }
  }

  searchIntoData(datos) {
    this.searchfreight = this.listInventory;
    let searchTerm = datos;
    if (!searchTerm) {
    }
    if (searchTerm && searchTerm.trim() != '') {
      this.listInventory = this.searchfreight.filter((item) => {
        return (
          item.Actividad.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
          item.Estado.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
          item.DocumentoReferencia.toLowerCase().indexOf(
            searchTerm.toLowerCase()
          ) > -1 ||
          item.Observacion.toLowerCase().indexOf(searchTerm.toLowerCase()) >
            -1 ||
          item.NumeroDocumento.toLowerCase().indexOf(searchTerm.toLowerCase()) >
            -1 ||
          item.Cliente.toLowerCase().indexOf(searchTerm.toLowerCase()) >
            -1
        );
      });

      if (this.citiessearch.length == 0) {
        this.mostrar = true;
        this.searclist = false;
        this.returnList = true;
      } else {
        this.mostrar = false;
        this.searclist = false;
        this.returnList = true;
      }

      this.articSearch = '';
    }
  }

  // search() {
  //   this.parameterSearch = {
  //     idBandeja: this.idbandeja,
  //     busqueda: this.articSearch,
  //     idUsuario: 61
  //   }

  //   this.inventario.searchArticles(this.parameterSearch).subscribe((res) => {

  //     if (res.data.length == 0) {
  //       this.returnList = true;
  //       this.articSearch = "";
  //       this.mostrar = true;
  //       this.validarItems(res.data)
  //     } else{

  //     }

  //     // this.listInventory = ;
  //   });
  // }

  validarItems(inven) {
    this.listInventory = [];
    for (const i of Object['values'](inven)) {
      i['DocumentoReferencia'] = `${i['Documento Referencia']}`;
      i['FechaCreacion'] = `${i['Fecha Creación']}`;
      i['FechaModificacion'] = `${i['Fecha Modificación']}`;
      i['NumeroDocumento'] = `${i['Número Documento']}`;
      i['Observacion'] = `${i['Observación']}`;
      i['TipoDocumento'] = `${i['Tipo Documento']}`;
      i['UsuarioModificacion'] = `${i['Usuario Modificación']}`;
      this.listInventory.push(i);
    }
    this.listInventory.reverse();
  }

  actionExecuted($event): void {
    switch ($event.description) {
      case 'New':
        this.validarTipoFormulario();
        // this.router.navigate(['dashboard/create-reservation', this.idbandeja ], { skipLocationChange: true });
        break;
    }
  }

  validarorigin(dato) {
    if (dato == 1) {
      this.idDocumento = 10;
    } else {
      this.idDocumento = 7;
    }
  }

  editar(idDoc) {
    this.documentoBodega = idDoc.IdDocumentoBodega;
    if (this.idbandeja == 29) {
      this.router.navigate(['dashboard/edit-receipts', this.documentoBodega], {
        skipLocationChange: true,
      });
    } else if (this.idbandeja == 38) {
      this.router.navigate(['dashboard/edit-outputs', this.documentoBodega], {
        skipLocationChange: true,
      });
    } else if (this.idbandeja == 30) {
      if (this.idDocumento == 7) {
        this.router.navigate(['dashboard/editTrasnfer', this.idDocumento], {
          skipLocationChange: true,
        });
      } else {
        this.router.navigate(['dashboard/editTrasnferDest', this.idDocumento], {
          skipLocationChange: true,
        });
      }
    } else {
      this.router.navigate(['dashboard/edit-reserva', this.documentoBodega], {
        skipLocationChange: true,
      });
    }
  }

  validarTipoFormulario(): void {
    if (this.idbandeja == 29) {
      this.router.navigate(['dashboard/create-receipts', 2], {
        skipLocationChange: true,
      });
    } else if (this.idbandeja == 38) {
      this.router.navigate(['dashboard/create-outputs', 6], {
        skipLocationChange: true,
      });
    } else if (this.idbandeja == 30) {
      if (this.idDocumento == 7) {
        this.router.navigate(['dashboard/createTrasnfer', this.idDocumento], {
          skipLocationChange: true,
        });
      } else {
        this.router.navigate(
          ['dashboard/createTrasnferDest', this.idDocumento],
          { skipLocationChange: true }
        );
      }
    } else {
      this.router.navigate(['dashboard/CrearReserva', 12], {
        skipLocationChange: true,
      });
    }
  }

  limpiar() {
    this.searclist = true;
    this.returnList = false;
    this.mostrar = false;
    this.articSearch = '';
    this.validarItems(this.citiessearch);
  }
}
