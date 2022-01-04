import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/auth/login.service';
import {AppComponent} from '../../app.component'



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  userInfo;
  env = environment;
  constructor( public loginservice: LoginService, private router: Router, private appcom: AppComponent) { }

  ngOnInit() {
    this.getUserLogged();
  }
  getUserLogged() {
    this.loginservice.getUserLogged().subscribe(user => {
      
      this.userInfo = user['usuario'];
    });

  }

  cambiarIdioma(lang: string){
    this.appcom.changeLang(lang);
  }

  logout(){
    this.loginservice.islogout();
    this.router.navigateByUrl('login');
   
  }

  irPerfil(){
    this.router.navigate(['dashboard/miProfile'], { skipLocationChange: true });
  }

}
