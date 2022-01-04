import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class DatabaseService {
  url: any;
  urlCliente: any;
  username;
  password;
  private configurationPos: [];
  private configurationPos$ = new Subject<any>();
  private urlEnpoint = 'https://sikon.ditosas.com:4450/KardexApi/api/Ubicacion/';
  private urlEnpointCiudad = 'https://sikon.ditosas.com:4450/KardexApi/api/Tercero/';

  headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient, private cookies: CookieService) {
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.url = this.urlEnpoint;
    this.urlCliente = this.urlEnpointCiudad;

  }


  getDistribucionCenter(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.url + 'CentroDistribucion_CRUD'+proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  getCiudad(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.url + 'Ciudad_CRUD'+ proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  getCodigoPostal(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.url + 'CodigoPostal_CRUD'+ proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  getPais(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.url + 'Pais_CRUD'+ proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }
  
  getBodega(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.url + 'Bodega_CRUD'+ proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  getAlmacen(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.url + 'Almacen_CRUD'+ proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  getCliente(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.urlCliente + 'Cliente_CRUD'+ proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  getareaVenta(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.urlCliente + 'AreaVenta_CRUD'+ proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  getProveedor(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.urlCliente + 'Proveedor_CRUD'+ proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }


  getTransitario(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.urlCliente + 'Transporte_CRUD'+ proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }
// 



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
