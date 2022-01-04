import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAction } from 'src/data/modelos/controles/IAction';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.css']
})
export class SalesOrderComponent<t, k> implements OnInit {
  action: IAction<t, k>[];
  listProduct: any;
  idOrder: any;
  itemproduct: any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.action = [
      {
        description: "Create Trasnfer",
        icon: "mdi mdi-creation",
      },
      {
        description: "Update",
        icon: "mdi mdi-update",
      },
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
    this.activatedRoute.params
      .subscribe(
        (Params) => {
          this.idOrder = Params['id'];
        }
      );
  }

  ngOnInit(): void {
    this.getProducto();
  }

  actionExecuted($event): void {
    switch ($event.description) {

      case "Create Trasnfer":
        this.router.navigate(['dashboard/create-trasnfer'], { skipLocationChange: true });
        break;
      case "Create Outboound":
        this.router.navigate(['dashboard/create-outbound'], { skipLocationChange: true });
        break;
      case "Cancel":
        this.router.navigate(['dashboard/list-orders'], { skipLocationChange: true });
        break;
    }
  }

  getProducto() {
    
    if (this.idOrder === '0') {
      this.itemproduct = [];
    } else {
      const product = [
        {
          'Order': 222,
          'POCustomer': 34556,
          'WSHOrigin': "RPM MEL",
          'Customer': "Axil Coffe",
          'OrderDate': "10/06/2021",
          'DeliveryDate': "17/06/2021",
          'DeliveryMethod': "delivery/local",
          'FreihtCompany': "civic",
          'OrderStatus': "draft"
        },
        {
          'Order': 111,
          'POCustomer': 25223,
          'WSHOrigin': "RPM SYD",
          'Customer': "litlet rebel",
          'OrderDate': "1/06/2021",
          'DeliveryDate': "20/06/2021",
          'DeliveryMethod': "delivery/interstate",
          'FreihtCompany': "Cameron",
          'OrderStatus': "In Picking"
        },
        {
          'Order': 3592,
          'POCustomer': 223334,
          'WSHOrigin': "RPM SYD",
          'Customer': "Infinity coffe",
          'OrderDate': "1/05/2021",
          'DeliveryDate': "20/07/2021",
          'DeliveryMethod': "Pick Up",
          'FreihtCompany': "Customer",
          'OrderStatus': "Shipped"
        },
      ]
      this.listProduct = product;

      this.listProduct.map((type) => {
        if (parseInt(this.idOrder) === type.Order) {
          this.itemproduct = type;
        }
      });
    }

  }
}
