import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import {LoginComponent} from './login/login.component'
import { AuthGuard } from "./guards/auth.guard";
import { MiPerfilComponent } from "./mi-perfil/mi-perfil.component";
import { PagesComponent } from "../pages/pages.component";



const routes: Routes = [
    {path: 'login', component: LoginComponent,
    // canActivate:[AuthGuard]
},
    

    {path: 'dashboard', component: PagesComponent,
    canActivate:[AuthGuard],
    children: [
      {path: 'miProfile', component: MiPerfilComponent,  data: {titulo: ' My Profile'}},
     
    ]},
];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }