import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportOsPageRoutingModule } from './report-os-routing.module';

import { ReportOsPage } from './report-os.page';
import { HeaderMobileComponent } from "../../components/header-mobile/header-mobile.component";
import { HeaderDesktopComponent } from 'src/app/components/header-desktop/header-desktop.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportOsPageRoutingModule,
    HeaderMobileComponent,
    HeaderDesktopComponent

],
  declarations: [ReportOsPage]
})
export class ReportOsPageModule {}
