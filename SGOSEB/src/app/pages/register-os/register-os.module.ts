import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterOsPageRoutingModule } from './register-os-routing.module';

import { RegisterOsPage } from './register-os.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterOsPageRoutingModule,
    
    
  ],
  declarations: [RegisterOsPage]
})
export class RegisterOsPageModule {}
