import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { HeaderMobileComponent } from "../components/header-mobile/header-mobile.component";
import { ComponentModule } from '../component/component.module';
import { MaskedInputComponent } from "../components/masked-input/masked-input.component";
import { ButtonComponent } from "../components/button/button.component";
import { UnmaskedInputComponent } from "../components/unmasked-input/unmasked-input.component";




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    // HeaderMobileComponent
    ComponentModule,
    MaskedInputComponent,
    ButtonComponent,
    UnmaskedInputComponent
],
  declarations: [HomePage]
})
export class HomePageModule {}
