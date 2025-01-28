import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonLabel } from '@ionic/angular';

import { PartsAndServicesPageRoutingModule } from './parts-and-services-routing.module';

import { PartsAndServicesPage } from './parts-and-services.page';
import { ComponentModule } from 'src/app/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartsAndServicesPageRoutingModule,
    ComponentModule,
    


  ],
  declarations: [PartsAndServicesPage]
})
export class PartsAndServicesPageModule {}
