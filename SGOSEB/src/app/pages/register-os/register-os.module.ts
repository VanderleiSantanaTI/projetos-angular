import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterOsPageRoutingModule } from './register-os-routing.module';

import { RegisterOsPage } from './register-os.page';
import { HeaderDesktopComponent } from "../../components/header-desktop/header-desktop.component";
import { HeaderMobileComponent } from 'src/app/components/header-mobile/header-mobile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterOsPageRoutingModule,
    HeaderDesktopComponent,
    HeaderMobileComponent
],
  declarations: [RegisterOsPage]
})
export class RegisterOsPageModule {}
