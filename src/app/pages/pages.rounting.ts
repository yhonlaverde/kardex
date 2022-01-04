import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { PagesComponent } from './pages.component';
import {ProgressComponent} from './progress/progress.component'
import {Grafica1Component} from './grafica1/grafica1.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { ListOfReservationComponent } from './list-of-reservation/list-of-reservation.component';
import { AuthGuard } from "../auth/guards/auth.guard";
import { CrearReservaComponent } from "../shared/component/inventory/crear-reserva/crear-reserva.component";
import { EditarReservationComponent } from "./editar-reservation/editar-reservation.component";

const routes: Routes = [
    {path: 'dashboard', component: PagesComponent,
    canActivate:[AuthGuard],
    children: [
      {path: '', component: Grafica1Component,  data: {titulo: ' Dashboard'}},
      {path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'}},
      {path: 'grafica1', component: Grafica1Component, data: {titulo: 'Gráfica #1'}},
      {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de Cuenta'}},
      {path: 'create-reservation/:id', component: CreateReservationComponent, data: {titulo: 'Create Reservation'}},
      {path: 'list-of-reservation/:id', component: ListOfReservationComponent, data: {titulo: 'List Of Reservation'}},
      {path: 'Receipts/:id', component: ListOfReservationComponent, data: {titulo: 'List Of Receipts'}},
      {path: 'Outputs/:id', component: ListOfReservationComponent, data: {titulo: 'List Of Outputs'}},
      {path: 'create-receipts/:id', component: CreateReservationComponent, data: {titulo: 'Create Receipts'}},
      {path: 'create-outputs/:id', component: CreateReservationComponent, data: {titulo: 'Create Outputs'}},
      {path: "CrearReserva/:id", component: CreateReservationComponent, data: {titulo: 'Create Reservation'}},
      {path: "createTrasnferDest/:id", component: CreateReservationComponent, data: {titulo: 'Destination Merchandise Transfer'}},
      {path: "createTrasnfer/:id", component: CreateReservationComponent, data: {titulo: 'Transfer of Origin Merchandise'}},
      {path: 'transfer/:id', component: ListOfReservationComponent, data: {titulo: 'Trasnfer'}},
     
      {path: 'edit-receipts/:id', component: EditarReservationComponent, data: {titulo: 'Edit Receipts'}},
      {path: 'edit-outputs/:id', component: EditarReservationComponent, data: {titulo: 'Edit Outputs'}},
      {path: "edit-reserva/:id", component: EditarReservationComponent, data: {titulo: 'Edit Reservation'}},
      {path: "editTrasnferDest/:id", component: EditarReservationComponent, data: {titulo: 'Edit Destination Merchandise Transfer'}},
      {path: "editTrasnfer/:id", component: EditarReservationComponent, data: {titulo: 'Edit Transfer of Origin Merchandise'}},
      // {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PagesRoutingModule{}