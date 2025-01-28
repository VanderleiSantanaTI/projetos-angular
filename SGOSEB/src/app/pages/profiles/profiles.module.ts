import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilesPageRoutingModule } from './profiles-routing.module';

import { ProfilesPage } from './profiles.page';
import { HeaderMobileComponent } from 'src/app/components/header-mobile/header-mobile.component';
import { HeaderDesktopComponent } from 'src/app/components/header-desktop/header-desktop.component';
import { ComponentModule } from 'src/app/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilesPageRoutingModule,
    HeaderMobileComponent,
    HeaderDesktopComponent,
    ComponentModule
  ],
  declarations: [ProfilesPage]
})
export class ProfilesPageModule {}
