import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { LoginService } from '../../shared/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss']
})
export class LoginComponent implements OnInit {
  usuario: any;
  contrasena: any;
  showPassword = false;
  constructor( private router: Router, public loginservice: LoginService,  public authFire: AngularFireAuth,) { }

  env = environment;

  ngOnInit(): void {
  }

  // login(){
  //  
  // }

  validar(even){
  }
  login() {
    const paramet = {
      user: this.usuario,
      password: this.contrasena
    }

    this.loginservice.LoginInit(paramet).subscribe((resp)=>{
      const parameter = {
        Usuario: resp['usuario'],
        Jerarquia: resp['jerarquiaUbicacionUsuario']
      }
      if (resp.mensaje.msgId === 1) {
        
         this.loginservice.setData(resp)
        this.loginservice.setToken(resp['usuario']);
        this.loginservice.setTokenJerarquia(resp['jerarquiaUbicacionUsuario']);
        this.InitFireBase();
        this.router.navigateByUrl('dashboard');
       
      }else{
        Swal.fire(
          'Good job!',
          resp.mensaje.msgStr,
          'error'
        )
      }
    })


    //Verificar si ha ingresasdo datos

  }

  private InitFireBase() {


    this.authFire.signInWithEmailAndPassword(
      "abako@ditosas.com",
      "abako123"
    );

  }

  mostrar(){
    var tipo = document.getElementById("password");
    
    // if(tipo.type == "password"){
    //     tipo.type = "text";
    // }else{
    //     tipo.type = "password";
    // }
}


  goToDito() {
    window.open("http://www.ditosas.com/", "_blank");
  }

}
