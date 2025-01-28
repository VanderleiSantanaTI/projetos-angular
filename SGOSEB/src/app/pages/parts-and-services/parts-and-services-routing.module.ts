import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartsAndServicesPage } from './parts-and-services.page';

const routes: Routes = [
  {
    path: '',
    component: PartsAndServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartsAndServicesPageRoutingModule {}
