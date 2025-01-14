import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    // redirectTo: 'register-os',
    // redirectTo: 'home',
    // redirectTo: 'report-os',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'register-os',
    loadChildren: () => import('./pages/register-os/register-os.module').then( m => m.RegisterOsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'report-os',
    loadChildren: () => import('./pages/report-os/report-os.module').then( m => m.ReportOsPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./pages/start/start.module').then( m => m.StartPageModule)
  },  {
    path: 'close-sevice-order',
    loadChildren: () => import('./pages/close-sevice-order/close-sevice-order.module').then( m => m.CloseSeviceOrderPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
