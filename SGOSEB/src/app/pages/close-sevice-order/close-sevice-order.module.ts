import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CloseSeviceOrderPageRoutingModule } from './close-sevice-order-routing.module';

import { CloseSeviceOrderPage } from './close-sevice-order.page';
import { HeaderDesktopComponent } from 'src/app/components/header-desktop/header-desktop.component';
import { HeaderMobileComponent } from 'src/app/components/header-mobile/header-mobile.component';
import { ButtonComponent } from "../../components/button/button.component";
import { OrderServiceTableComponent } from "../../components/order-service-table/order-service-table.component";
import { ComponentModule } from 'src/app/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CloseSeviceOrderPageRoutingModule,
    HeaderDesktopComponent,
    HeaderMobileComponent,
    ReactiveFormsModule,
    ButtonComponent,
    ComponentModule,
    OrderServiceTableComponent
],
  declarations: [CloseSeviceOrderPage]
})
export class CloseSeviceOrderPageModule {}
