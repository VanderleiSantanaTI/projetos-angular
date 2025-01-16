import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { HeaderDesktopComponent } from 'src/app/components/header-desktop/header-desktop.component';
import { HeaderMobileComponent } from 'src/app/components/header-mobile/header-mobile.component';
import { ComponentModule } from 'src/app/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    HeaderDesktopComponent,
    HeaderMobileComponent,
    ComponentModule

  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
