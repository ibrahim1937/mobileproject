import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'monument/:id',
    loadChildren: () => import('./pages/monument/monument.module').then( m => m.MonumentPageModule)
  },
  {
    path: 'visite',
    loadChildren: () => import('./pages/visite/visite.module').then( m => m.VisitePageModule)
  },
  {
    path: 'visitepage/:id',
    loadChildren: () => import('./pages/visitepage/visitepage.module').then( m => m.VisitepagePageModule)
  },
  {
    path: 'addvisite',
    loadChildren: () => import('./pages/addvisite/addvisite.module').then( m => m.AddvisitePageModule)
  },
  {
    path: 'testfile',
    loadChildren: () => import('./pages/testfile/testfile.module').then( m => m.TestfilePageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module').then( m => m.TestPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
