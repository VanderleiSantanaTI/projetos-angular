import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CloseSeviceOrderPage } from './close-sevice-order.page';

const routes: Routes = [
  {
    path: '',
    component: CloseSeviceOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CloseSeviceOrderPageRoutingModule {}
