import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class LoginService {
  url: any;
  username;
  password;
  private urlEnpoint = 'https://sikon.ditosas.com:4450/KardexApi/api/Seguridad/';
  headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient, private cookies: CookieService) {
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.url = this.urlEnpoint;
   }
   
   LoginInit(parameters): Observable<any> {
     const options = {
      headers: this.headers,
    };
    this.username = parameters.user;
    this.password = parameters.password;
     const user = `/${parameters.user}/`;
    return this.http.get(this.url + 'LogIn' + user  + parameters.password , options)
    .pipe(map(this.extractData))
    .pipe(catchError(this.handleError))
  }

  setTokenJerarquia(token) {
    localStorage.setItem('Jerarquia', JSON.stringify(token) );
  }

  setToken(token) {
    localStorage.setItem('token', JSON.stringify(token) );
  }
  setData(token) {

    localStorage.setItem('data', JSON.stringify(token) );
  }
  getToken() {
    return this.cookies.get("token");
  }

  getDataall() {
    return this.cookies.get("data");
  }

  getTokenJeraquia() {
    return localStorage.getItem("Jerarquia");
  }

  getUser() {
    return this.http.get("https://reqres.in/api/users/2");
  }
  getUserLogged() {
    const token = localStorage.getItem('token');
    const tokenitem = JSON.parse(token);
     const options = {
      headers: this.headers,
    };
    // return token;
     const user = `/${tokenitem?.nombreUsuario}/`;
    return this.http.get(this.url + 'LogIn' + user  + tokenitem?.contrasena , options)
    .pipe(map(this.extractData))
    .pipe(catchError(this.handleError))
  }

  islogout(){
    localStorage.removeItem("token");
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
