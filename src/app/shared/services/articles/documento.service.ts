import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class DocumentoService {
  url: any;
  urlArticle: any;
  username;
  password;
  private urlEnpoint = 'https://sikon.ditosas.com:4450/KardexApi/api/Documentos/';
//   DocumentoBodega_CRUD
  headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient, private cookies: CookieService) {
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.url = this.urlEnpoint;

  }


  getDocumento(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.url + 'DocumentoBodega_CRUD'+proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  ordenCompra(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.url + 'OrdenCompra_CRUD'+proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  getInTransit(parameters): Observable<any> {
    const options = {
      headers: this.headers,
    };
    
    const proces = `?idOrdenCompra=${parameters.idOrdenCompra}&idUsuario=${parameters.idUsuario}`;
    var url = this.url + 'OrdenCompra_Transito' + proces;
    return this.http.post(url, proces)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }
  getAprobarCompra(parameters): Observable<any> {
    const options = {
      headers: this.headers,
    };
    
    const proces = `?idOrdenCompra=${parameters.idOrdenCompra}&idUsuario=${parameters.idUsuario}`;
    var url = this.url + 'OrdenCompra_Aprobar' + proces;
    return this.http.post(url, proces)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }
  getAnularCompra(parameters): Observable<any> {
    const options = {
      headers: this.headers,
    };
    
    const proces = `?idOrdenCompra=${parameters.idOrdenCompra}&idUsuario=${parameters.idUsuario}`;
    var url = this.url + 'OrdenCompra_Anular' + proces;
    return this.http.post(url, proces)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  getAprobarDocumento(parameters): Observable<any> {
    const options = {
      headers: this.headers,
    };
    
    const proces = `?idDocumentoBodega=${parameters.idDocumentoBodega}&idUsuario=${parameters.idUsuario}`;
    var url = this.url + 'DocumentoBodega_Aprobar' + proces;
    return this.http.post(url, proces)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  getAnularDocumento(parameters): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?idDocumentoBodega=${parameters.idDocumentoBodega}&idUsuario=${parameters.idUsuario}`;
    var url = this.url + 'DocumentoBodega_Anular' + proces;
  
    return this.http.post(url, proces)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  
  getMotivo(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.url + 'Motivo_CRUD'+ proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  getPuerto(parameters, proceso): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const proces = `?proceso=${proceso}/`;
    return this.http.post(this.url + 'Puerto_CRUD'+ proces, parameters)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

//   getUnidadEmpaque(parameters, proceso): Observable<any> {
//     const options = {
//       headers: this.headers,
//     };
//     const proces = `?proceso=${proceso}/`;
//     return this.http.post(this.url + 'UnidadEmpaque_CRUD'+ proces, parameters)
//       .pipe(map(this.extractData))
//       .pipe(catchError(this.handleError))
//   }

//   getSubCategory(parameters, proceso): Observable<any> {
//     const options = {
//       headers: this.headers,
//     };
//     const proces = `?proceso=${proceso}/`;
//     return this.http.post(this.url + 'SubCategoria_CRUD'+ proces, parameters)
//       .pipe(map(this.extractData))
//       .pipe(catchError(this.handleError))
//   }

//   getProcess(parameters, proceso): Observable<any> {
//     const options = {
//       headers: this.headers,
//     };
//     const proces = `?proceso=${proceso}/`;
//     return this.http.post(this.url + 'ProcesoItem_CRUD'+ proces, parameters)
//       .pipe(map(this.extractData))
//       .pipe(catchError(this.handleError))
//   }

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
