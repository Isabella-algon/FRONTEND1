import { Routes } from '@angular/router';
 
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then(m => m.Login)
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then(m => m.Home)
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/products').then(m => m.Products)
  },
  {
    
  path: 'users',
  loadComponent: () => import('./features/users/users').then(m => m.Users)

  }
];