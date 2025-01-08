import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMobileComponent } from '../components/header-mobile/header-mobile.component';
import { MaskedInputComponent } from '../components/masked-input/masked-input.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderMobileComponent,
    MaskedInputComponent,
    IonicModule
  ]
, exports: [
    HeaderMobileComponent,
    IonicModule
  ]
})
export class ComponentModule { }
