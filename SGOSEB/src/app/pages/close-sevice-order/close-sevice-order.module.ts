import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CloseSeviceOrderPageRoutingModule } from './close-sevice-order-routing.module';

import { CloseSeviceOrderPage } from './close-sevice-order.page';
import { HeaderDesktopComponent } from 'src/app/components/header-desktop/header-desktop.component';
import { HeaderMobileComponent } from 'src/app/components/header-mobile/header-mobile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CloseSeviceOrderPageRoutingModule,
    HeaderDesktopComponent,
    HeaderMobileComponent
  ],
  declarations: [CloseSeviceOrderPage]
})
export class CloseSeviceOrderPageModule {}
