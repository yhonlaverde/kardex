import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module'
import {PagesModule} from './pages/pages.module'

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import {AuthModule} from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DatabaseModule} from './shared/component/dataBase/database.module'
import {SalesModule} from './shared/component/sales/sales.module'
import {PurchaseModule} from './shared/component/purchase/purchase.module'
import {BandejasModule} from './shared/component/bandejas/bandejas.module'
import {InventoryModule} from './shared/component/inventory/inventory.module'
import { CookieService } from 'ngx-cookie-service';
import { NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { environment } from 'src/environments/environment';
// import {TranslateModule} from '@ngx-translate/core';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ReactiveFormsModule } from '@angular/forms';


// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, environment.assets + '/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    
    NopagefoundComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    AppRoutingModule,
    PagesModule,
    AuthModule,
    BrowserAnimationsModule,
    DatabaseModule,
    SalesModule,
    PurchaseModule,
    BandejasModule,
    InventoryModule,
    NgbModule,
    NgbTimepickerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    AngularFireStorageModule,
    
  ],

  
  
  providers: [CookieService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
