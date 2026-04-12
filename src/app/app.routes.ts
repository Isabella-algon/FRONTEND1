import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', 
        pathMatch: 'full', 
        redirectTo: '/login',
    },
    {
        path: 'login',
        loadComponent: () => import('./features/login/login').then((m) => m.Login)
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home').then((m) => m.Home)
    },
    {
  path: 'homeworks',
  loadComponent: () => import('./features/home/home').then(m => m.Home)
    },
    {
  path: 'home',
  loadComponent: () => import('./features/home/home').then(m => m.Home)
},
];
