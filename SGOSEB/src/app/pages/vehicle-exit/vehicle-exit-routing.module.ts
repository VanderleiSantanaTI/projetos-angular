import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleExitPage } from './vehicle-exit.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleExitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleExitPageRoutingModule {}
