import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportOsPage } from './report-os.page';

const routes: Routes = [
  {
    path: '',
    component: ReportOsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportOsPageRoutingModule {}
