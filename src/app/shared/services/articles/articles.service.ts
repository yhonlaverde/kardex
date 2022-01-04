import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class ArticlesService {
  url: any;
  urlArticle: any;
  username;
  password;
  private urlEnpoint = 'https://sikon.ditosas.com:4450/KardexApi/api/Bandejas/';
  private urlEnpointArticles = 'https://sikon.ditosas.com:4450/KardexApi/api/Items/'
  headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient, private cookies: CookieService) {
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.url = this.urlEnpoint;
    this.urlArticle = this.urlEnpointArticles;

  }

  getArticulosColumnas(parameters): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const id = `/${parameters}/`;
    return this.http.get(this.url + 'Atributos' + id)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  searchArticles(parameters): Observable<any> {
   
    const options = {
      headers: this.headers,
    };
    const param = `/${parameters}/`;
    return this.http.post(this.url + 'data', parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  searchArticlesforInvent(parameters): Observable<any> {
   
    const options = {
      headers: this.headers,
    };
   
   // //  this.username = parameters.user;
   // //  this.password = parameters.password; /api/Items/Get_Inventario/{idUsuario}/{busqueda}/{idCentroDistribucion}/{idBodega}/{idAlmacen}/{IdMarcas}/{IdClasificacion}/{estado}
     const idUsuario = `/${parameters.idUsuario}`;
     const busqueda = `/${parameters.busqueda}`;
     const idAlmacen = `/${parameters.idAlmacen }`;
     
    return this.http.get(this.urlEnpointArticles + 'Get_InventarioProcesos' + idUsuario  + busqueda + idAlmacen , options)
    .pipe(map(this.extractData))
    .pipe(catchError(this.handleError))
  }

  searchBodegaItem(parameters): Observable<any> {
   
    const options = {
      headers: this.headers,
    };
   
   // //  this.username = parameters.user; /api/Items/Get_InventarioItem/{idUsuario}/{IdItem}/{idAlmacen}
     const idUsuario = `/${parameters.idUsuario}`;
     const IdItem = `/${parameters.IdItem}`;
     const idAlmacen = `/${parameters.idAlmacen }`;
     
    return this.http.get(this.urlEnpointArticles + 'Get_InventarioItem' + idUsuario  + IdItem + idAlmacen , options)
    .pipe(map(this.extractData))
    .pipe(catchError(this.handleError))
  }

  GuardarArticulo(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const param = `/${parameters}/`;
    const proces = `?proceso=${proceso}`;
    return this.http.post(this.urlArticle + 'Item_CRUD' + proces, parameters)
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
