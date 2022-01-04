import { Component, OnInit } from '@angular/core';
import { IAction } from 'src/data/modelos/controles/IAction';

@Component({
  selector: 'app-return-order',
  templateUrl: './return-order.component.html',
  styleUrls: ['./return-order.component.css']
})
export class ReturnOrderComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  constructor() {
    this.action = [
      {
        description: "Save",
        icon: "mdi mdi-content-save",
      }
      ,
      {
        description: "Create Outboound",
        icon: "mdi mdi-creation",
      }
      ,
      {
        description: "Cancel",
        icon: "mdi mdi-stop-circle",
      },
      {
        description: "Delete",
        icon: "mdi mdi-delete",
      },
    ];
   }

  ngOnInit(): void {
  }

  actionExecuted($event): void {
    switch ($event.description) {

      // case "New":
      //   this.router.navigate(['dashboard/create-reservation', this.id ], { skipLocationChange: true });
      //   break;
    }
  }

}
