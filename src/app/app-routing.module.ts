import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { PagesRoutingModule } from "./pages/pages.rounting";
import {SalesRoutingModule} from "./shared/component/sales/sales-routing.module"
import { AuthRoutingModule } from "./auth/auth.routing";
import {NopagefoundComponent} from './nopagefound/nopagefound.component'
import {DatabaseRoutingModule} from './shared/component/dataBase/database-routing.module'
import {PurchaseRoutingModule} from './shared/component/purchase/purchase-routing.module'
import {BandejasRoutingModule} from './shared/component/bandejas/bandeja-rounting.module'
import {InventoryRoutingModule} from './shared/component/inventory/inventory-rounting.module'



const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: '**', component: NopagefoundComponent},
  // {
  //   path: "bandeja/:idMenu",
  //   component: BaseBandejaComponent,
  // },

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
    DatabaseRoutingModule,
    SalesRoutingModule,
    PurchaseRoutingModule,
    BandejasRoutingModule,
    InventoryRoutingModule
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
