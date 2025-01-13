import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterOsPage } from './register-os.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterOsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterOsPageRoutingModule {}
