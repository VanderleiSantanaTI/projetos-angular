import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneratePdfPage } from './generate-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: GeneratePdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneratePdfPageRoutingModule {}
