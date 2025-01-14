import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { ComponentModule } from '../../component/component.module';
import { MaskedInputComponent } from "../../components/masked-input/masked-input.component";
import { ButtonComponent } from "../../components/button/button.component";
import { UnmaskedInputComponent } from "../../components/unmasked-input/unmasked-input.component";
import { HeaderDesktopComponent } from "../../components/header-desktop/header-desktop.component";



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
    UnmaskedInputComponent,
    HeaderDesktopComponent
],
  declarations: [HomePage]

})
export class HomePageModule {}
