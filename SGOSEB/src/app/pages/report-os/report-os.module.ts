import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportOsPageRoutingModule } from './report-os-routing.module';

import { ReportOsPage } from './report-os.page';
import { HeaderMobileComponent } from "../../components/header-mobile/header-mobile.component";
import { HeaderDesktopComponent } from 'src/app/components/header-desktop/header-desktop.component';
import { ComponentModule } from 'src/app/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportOsPageRoutingModule,
    HeaderMobileComponent,
    HeaderDesktopComponent,
    ReactiveFormsModule,
    ComponentModule

],
  declarations: [ReportOsPage]
})
export class ReportOsPageModule {}
