import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class MaestrosService {
  url: any;
  urlArticle: any;
  username;
  password;
  private urlEnpoint = 'https://sikon.ditosas.com:4450/KardexApi/api/Items/';

  headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient, private cookies: CookieService) {
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.url = this.urlEnpoint;

  }

  getClasificacion(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.url + 'Clasificacion_CRUD'+proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  getMarca(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.url + 'Marca_CRUD'+ proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  getUnidadEmpaque(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.url + 'UnidadEmpaque_CRUD'+ proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  getSubCategory(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.url + 'SubCategoria_CRUD'+ proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  getProcess(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.url + 'ProcesoItem_CRUD'+ proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }


  getOrigin(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.url + 'OrigenItem_CRUD'+ proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  getVariedad(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.url + 'VariedadItem_CRUD'+ proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  getInventario(parameters): Observable<any> {
    const options = {
     headers: this.headers,
   };
  
  // //  this.username = parameters.user;
  // //  this.password = parameters.password; /api/Items/Get_Inventario/{idUsuario}/{busqueda}/{idCentroDistribucion}/{idBodega}/{idAlmacen}/{IdMarcas}/{IdClasificacion}/{estado}
    const idUsuario = `/${parameters.idUsuario}`;
    const busqueda = `/${parameters.busqueda}`;
    const idAlmacen = `/${parameters.idAlmacen }`;
    const estado = `/${parameters.estado }`;
    const idCentroDistribucion = `/${parameters.idCentroDistribucion }`;
    const  IdMarcas = `/${parameters.IdMarcas }`;
    const  IdClasificacion = `/${parameters.IdClasificacion }`;
    const  idBodega = `/${parameters.idBodega }`;
   return this.http.get(this.url + 'Get_Inventario' + idUsuario  + busqueda + idCentroDistribucion +   idBodega  + idAlmacen + IdMarcas +  IdClasificacion + estado , options)
   .pipe(map(this.extractData))
   .pipe(catchError(this.handleError))
 }

  getListPrice(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.url + 'ListaPrecio_CRUD'+ proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }
  // Retorna el json de la petición
  private extractData(res: any) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error("Bad response status: " + res.status);
    }

    return res;
  }

  // Manejador de errores
  private handleError(error: any) {
    const errMsg = error.message || "Server error";
    console.error("Error al comunicarse al servicio:" + errMsg); // log to console instead
    return throwError(errMsg);
  }
}
