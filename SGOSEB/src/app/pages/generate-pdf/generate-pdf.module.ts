import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneratePdfPageRoutingModule } from './generate-pdf-routing.module';

import { GeneratePdfPage } from './generate-pdf.page';
import { ComponentModule } from 'src/app/component/component.module';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneratePdfPageRoutingModule,
    ComponentModule,
    FooterComponent
  ],
  declarations: [GeneratePdfPage]
})
export class GeneratePdfPageModule {}
