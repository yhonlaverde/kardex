import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class PostCodeService {
  url: any;
  urlCliente: any;
  username;
  password;
  private configurationPostCode: [];
  private configurationPostCode$ = new Subject<any>();
  private urlEnpoint = 'https://sikon.ditosas.com:4450/KardexApi/api/Ubicacion/';

  headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient, private cookies: CookieService) {
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.url = this.urlEnpoint;

  }

  public getConfig(): any {
    return this.configurationPostCode;
  }

  private setConfig$(newValue) {
    this.configurationPostCode = newValue;
    this.configurationPostCode$.next(newValue);
  }

  public getConfig$(): Observable<any> {
    return this.configurationPostCode$.asObservable();
  }

  public getCodigoPostal(parameters, proceso): void {

    // si tya recupero la primera vez, no vuelve a ingresar
    if (this.configurationPostCode !== undefined) {
      return;
    };

    const options = {
        headers: this.headers,
      };
      const proces = `?proceso=${proceso}/`;
      this.http.post(this.url + 'CodigoPostal_CRUD'+ proces, parameters).subscribe((data) => {

        this.setConfig$(data);
  
      });
        
  }

  getPostCodeSearch(parameters: string): Observable<any> {
    
    const options = {
      headers: this.headers,
    };
    const id = `/${parameters}/`;
    return this.http.get(this.url + 'GetCodigoPostal_Ciudad_Pais' + id)
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
