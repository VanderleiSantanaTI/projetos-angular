import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { HeaderMobileComponent } from '../components/header-mobile/header-mobile.component';
import { MaskedInputComponent } from '../components/masked-input/masked-input.component';
import { IonicModule } from '@ionic/angular';
import { HeaderDesktopComponent } from '../components/header-desktop/header-desktop.component';
import { OrderServiceTableComponent } from '../components/order-service-table/order-service-table.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderMobileComponent,
    HeaderDesktopComponent,
    OrderServiceTableComponent,
    MaskedInputComponent,
    IonicModule


  ]
, exports: [
    HeaderMobileComponent,
    HeaderDesktopComponent,
    OrderServiceTableComponent,
    MaskedInputComponent,
    IonicModule
  ]
})
export class ComponentModule { }
