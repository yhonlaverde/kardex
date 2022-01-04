import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { event } from 'jquery';
import { IAction } from 'src/data/modelos/controles/IAction';
import { BandParams } from "../../../../../data/modelos/controles/bandParams";


@Component({
  selector: 'app-base-bandeja',
  templateUrl: './base-bandeja.component.html',
  styleUrls: ['./base-bandeja.component.css']
})
export class BaseBandejaComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  params: BandParams = new BandParams();
  constructor(private router: Router,) {
    this.action = [
      {
        description: "New",
        icon: "mdi mdi-content-save",
      },
    ];
  }


  actionExecuted(event): void {
   
    switch (event.description) {
      case "folder_open":
        // this.abrirArticulo(paramevents.id);
        break;

      case "New":
        this.abrirArticulo('0');
        break;

      default:
        throw new Error(`No existe la acción ${event.action} en la bandeja`);
    }

  }


  abrirArticulo(dato) {
    this.router.navigate([`dashboard/articles/${dato}`], { skipLocationChange: true });
  }

  ngOnInit(): void {
  }

}
