import { Component, OnInit } from '@angular/core';
import { IAction } from 'src/data/modelos/controles/IAction';

@Component({
  selector: 'app-create-outbound',
  templateUrl: './create-outbound.component.html',
  styleUrls: ['./create-outbound.component.css']
})
export class CreateOutboundComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  constructor() {
    this.action = [
      {
        description: "Refresh",
        icon: "mdi mdi-refresh",
      },
      {
        description: "View",
        icon: "mdi mdi-eye",
      },
      {
        description: "Comunication Orders",
        icon: "mdi mdi-tag",
      }
      ,
      {
        description: "Reseived / Sent",
        icon: "mdi mdi-arrange-send-backward",
      }
      ,
      {
        description: "Delete",
        icon: "mdi mdi-delete",
      },
    ];
   }

  ngOnInit(): void {
  }

}
