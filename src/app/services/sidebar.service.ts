import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../shared/services/auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  userPortal: any[];
  menuPadre:any[];
  submenu: any[];
  menuList: any[];
  menu: any[] = [
    {
      titulo:  'Database',
      icono: 'mdi mdi-database',
      submenu: [
        {
          titulo: 'Distribution Center', url: 'distribution'
        },
        {
          titulo: 'Warehouse', url: 'warehouse'
        }, 
        {
          titulo: 'Storage area', url: 'Storagearea'
        },
        {
          titulo: 'Supplier', url: 'supplier'
        },
        {
          titulo: 'Customers', url: 'customers'
        },
        {
          titulo: 'Freight Forwander', url: 'freight'
        },
        {
          titulo: 'Sales Area', url: 'salesArea'
        },
        {
          titulo: 'PostCode', url: 'postCode'
        },
        {
          titulo: 'Country', url: 'country'
        },
        {
          titulo: 'Cities', url: 'city'
        },
        
      ]
    },
    {
      titulo:  'Purchase',
      icono: 'mdi mdi-cart-plus',
      submenu: [
        {
          titulo: 'Container', url: 'list-of-container'
        },
        {
          titulo: 'Port', url: 'port'
        },
      ]

    },
    {
      titulo:  'Sales',
      icono: 'mdi mdi-sale',
      submenu: [
        {
          titulo: 'Sales Order', url: 'list-orders'
        },
        {
          titulo: 'Return Order', url: 'return-order'
        }
      ]

    },
    {
      titulo:  'Product',
      icono: 'mdi mdi-cart-outline',
      submenu: [
         {
          titulo: 'List Price', url: 'ListPrecio'
        },
        {
          titulo: 'Product', url: 'bandeja/3'
        },
        {
          titulo: 'Brand', url: 'mark'
        },
        {
          titulo: 'Class', url: 'classitation'
        },
        {
          titulo: 'Unit Packing', url: 'unit-packing'
        },
        // {
        //   titulo: 'Sub Category', url: 'sub-category'
        // },
        {
          titulo: 'Process', url: 'process'
        },
        {
          titulo: 'Origin', url: 'origin'
        },
        {
          titulo: 'Varietal', url: 'variedad'
        },
      ]
    },
    {
      titulo:  'Inventory',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Inventory', url: 'inventory'
        },
        {
          titulo: 'Transfer – WHS TO WHS', url: 'transfer/30'
        },
        {
          titulo: 'Receipts', url: 'Receipts/29'
        },
        {
          titulo: 'Outputs', url: 'Outputs/38'
        },
        {
          titulo: 'Resevation', url: 'list-of-reservation/55'
        },
        {
          titulo: 'Reason', url: 'reason'
        },
      ]
    },

    {
      titulo:  'Reports',
      icono: 'mdi mdi-vector-arrange-above',
      submenu: [
        {
          titulo: 'List of Outbound deliveries', url: 'dashboard'
        },
        {
          titulo: 'Inventory overview', url: 'dashboard'
        },
      ]

    },
    {
      titulo:  'Setting',
      icono: 'mdi mdi-account-settings',
      submenu: [
        {
          titulo: 'setup', url: 'dashboard'
        },
      ]

    }
  ];
  constructor(public loginservice: LoginService) {
   
  }

  menuservice() {
    this.loginservice.getUserLogged().subscribe(user => {
      this.userPortal = user['menuPortal'];

      const uniqueArr = [];
      const uniqueArr2 = [];
      const parameters = {
        titulo: [],
        subtitulo: {
            subTitulo: [],
        }
      };

      this.userPortal.map((parti) => {
        
        if (parti.grupo === 0) {
          // uniqueArr.push({
          //   titulo: parti
          // });
            uniqueArr2.push({
               parti,
            });

          
          this.menuPadre = uniqueArr2;
        }else{
          uniqueArr.push(parti);
          this.menuList = uniqueArr;
        }

       
        // // let nuevaLongitud = this.menuPadre.unshift(this.menuList)


        this.menuList.map((element)=>{
          // this.menuPadre.includes({
            
          // })
            // const letarraynew = element.grupo.unshift()
          
        })



        // this.submenu = uniqueArr2;
        // this.menuList = uniqueArr;

      });

    });

  }
}
