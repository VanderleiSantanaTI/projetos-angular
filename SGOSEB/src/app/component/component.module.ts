import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMobileComponent } from '../components/header-mobile/header-mobile.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderMobileComponent
  ]
, exports: [
    HeaderMobileComponent
  ]
})
export class ComponentModule { }
