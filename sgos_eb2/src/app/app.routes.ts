import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full',
  },
  {
    path: 'start',
    loadComponent: () => import('./pages/start/start.page').then( m => m.StartPage)
  },
  {
    path: 'register-vehicle',
    loadComponent: () => import('./pages/register-vehicle/register-vehicle.page').then( m => m.RegisterVehiclePage)
  },
  {
    path: 'register-entry',
    loadComponent: () => import('./pages/register-entry/register-entry.page').then( m => m.RegisterEntryPage)
  },
  {
    path: 'register-exit',
    loadComponent: () => import('./pages/register-exit/register-exit.page').then( m => m.RegisterExitPage)
  },
  {
    path: 'service-list',
    loadComponent: () => import('./pages/service-list/service-list.page').then( m => m.ServiceListPage)
  },
  {
    path: 'report',
    loadComponent: () => import('./pages/report/report.page').then( m => m.ReportPage)
  },
  {
    path: 'loading',
    loadComponent: () => import('./modals/loading/loading.page').then( m => m.LoadingPage)
  }
];

