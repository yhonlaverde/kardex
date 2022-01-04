import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataInventory } from 'src/data/baseData/dataInventory/dataInventory';
import { IAction } from 'src/data/modelos/controles/IAction';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent<t, k> implements OnInit {

  public idInventory: any;
  fields: any[];
  action: IAction<t, k>[];
  public page:number;
  constructor(private activatedRoute: ActivatedRoute, private datainventory: DataInventory,) {
    this.fields = [];
    this.action = [
      {
        description: "New",
        icon: "mdi mdi-content-save",
      },
      {
        description: "Save",
        icon: "mdi mdi-content-save",
      },
      {
        description: "Load Detail",
        icon: "mdi mdi-file-import",
      },
      {
        description: "approve",
        icon: "mdi mdi-checkerboard",
      },
      {
        description: "Cancel",
        icon: "mdi mdi-stop",
      },
      {
        description: "To print",
        icon: "mdi mdi-cloud-print",
      },
    ];
    this.activatedRoute.params
      .subscribe(
        (Params) => {
          this.idInventory = Params['id'];
        }
      );
   }

  ngOnInit(): void {
    this.getInventory();
  }
  
  getInventory(): void { 
      this.selectInventoryNew();
    
  }


  selectInventoryNew():void {
    this.fields = this.datainventory.newInvetory();
  }

}
