import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StartPageRoutingModule } from './start-routing.module';
import { StartPage } from './start.page';
import { HeaderDesktopComponent } from 'src/app/components/header-desktop/header-desktop.component';
import { HeaderMobileComponent } from 'src/app/components/header-mobile/header-mobile.component';
import { ComponentModule } from 'src/app/component/component.module';
import { CardInfoComponent } from 'src/app/components/card-info/card-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartPageRoutingModule,
    HeaderMobileComponent,
    HeaderDesktopComponent,
    ComponentModule,
    CardInfoComponent


  ],
  declarations: [StartPage]
})
export class StartPageModule {}
