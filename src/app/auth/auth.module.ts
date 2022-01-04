import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../shared/services/auth/login.service';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';



@NgModule({
  declarations: [
    LoginComponent,
    MiPerfilComponent,
  ],
  exports: [
    LoginComponent,
    MiPerfilComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [LoginService],
})
export class AuthModule { }
