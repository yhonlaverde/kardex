import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAction } from 'src/data/modelos/controles/IAction';
declare var $: any;
@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  listProduct: any;
  idItem:any;
  constructor(private router: Router,) {
    this.action = [
      {
        description: "New",
        icon: "mdi mdi-content-save",
      },
      {
        description: "Filter",
        icon: "mdi mdi-filter",
      },
    ];
   }

  ngOnInit(): void {
   this.getProducto();
  
  }

  getProducto() {
    const product = [
        {
          'Order': 222,
          'POCustomer': 34556,
          'WSHOrigin' : "RPM MEL",
          'Customer' : "Axil Coffe",
          'OrderDate' : "10/06/2021",
          'DeliveryDate' : "17/06/2021",
          'DeliveryMethod': "delivery/local",
          'FreihtCompany' : "civic",
          'OrderStatus' :  "draft"
      },
      {
        'Order': 111,
        'POCustomer': 25223,
        'WSHOrigin' : "RPM SYD",
        'Customer' : "litlet rebel",
        'OrderDate' : "1/06/2021",
        'DeliveryDate' : "20/06/2021",
        'DeliveryMethod': "delivery/interstate",
        'FreihtCompany' : "Cameron",
        'OrderStatus' :  "In Picking"
      },
      {
        'Order': 3592,
        'POCustomer': 223334,
        'WSHOrigin' : "RPM SYD",
        'Customer' : "Infinity coffe",
        'OrderDate' : "1/05/2021",
        'DeliveryDate' : "20/07/2021",
        'DeliveryMethod': "Pick Up",
        'FreihtCompany' : "Customer",
        'OrderStatus' :  "Shipped"
      },
    ]
    this.listProduct = product;

  }

  actionExecuted($event): void {
    switch ($event.description) {

      case "New":
        this.idItem = 0;
        this.router.navigate(['dashboard/sales-order', this.idItem], { skipLocationChange: true });
        break;
    }
  }

  SelectionClick(row) {
  
    this.idItem = row.Order;
    this.router.navigate(['dashboard/sales-order', this.idItem], { skipLocationChange: true });
  }

}
