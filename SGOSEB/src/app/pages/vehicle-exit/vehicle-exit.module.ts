import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleExitPageRoutingModule } from './vehicle-exit-routing.module';

import { VehicleExitPage } from './vehicle-exit.page';
import { ComponentModule } from 'src/app/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleExitPageRoutingModule,
    ComponentModule,
    ReactiveFormsModule
  ],
  declarations: [VehicleExitPage]
})
export class VehicleExitPageModule {}
