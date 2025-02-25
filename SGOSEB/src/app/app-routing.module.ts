import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'register-os',
    loadChildren: () => import('./pages/register-os/register-os.module').then( m => m.RegisterOsPageModule),
    canActivate: [authGuard]  // Protege a rota com o authGuard
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule),
    canActivate: [authGuard]  // Protege a rota com o authGuard
  },
  {
    path: 'report-os',
    loadChildren: () => import('./pages/report-os/report-os.module').then( m => m.ReportOsPageModule),
    canActivate: [authGuard]  // Protege a rota com o authGuard
  },
  {
    path: 'start',
    loadChildren: () => import('./pages/start/start.module').then( m => m.StartPageModule),
    canActivate: [authGuard]  // Protege a rota com o authGuard
  },
  {
    path: 'close-sevice-order',
    loadChildren: () => import('./pages/close-sevice-order/close-sevice-order.module').then( m => m.CloseSeviceOrderPageModule),
    canActivate: [authGuard]  // Protege a rota com o authGuard
  },
  {
    path: 'generate-pdf',
    loadChildren: () => import('./pages/generate-pdf/generate-pdf.module').then( m => m.GeneratePdfPageModule),
    canActivate: [authGuard]  // Protege a rota com o authGuard
  },
  {
    path: 'vehicle-exit',
    loadChildren: () => import('./pages/vehicle-exit/vehicle-exit.module').then( m => m.VehicleExitPageModule),
    canActivate: [authGuard]  // Protege a rota com o authGuard
  },
  {
    path: 'profiles',
    loadChildren: () => import('./pages/profiles/profiles.module').then( m => m.ProfilesPageModule),
    canActivate: [authGuard]  // Protege a rota com o authGuard
  },
  {
    path: 'parts-and-services',
    loadChildren: () => import('./pages/parts-and-services/parts-and-services.module').then( m => m.PartsAndServicesPageModule),
    canActivate: [authGuard]  // Protege a rota com o authGuard
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
