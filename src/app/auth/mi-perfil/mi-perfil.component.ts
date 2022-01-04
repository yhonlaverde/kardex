import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/auth/login.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  jerarquiaUser:any = [];
  constructor(public loginservice: LoginService,) { }

  ngOnInit(): void {
    this.jerarquiaUser = this.loginservice.getDataall();
    console.log(this.jerarquiaUser);
  }

}
