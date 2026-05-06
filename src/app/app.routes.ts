import { Routes } from '@angular/router';
import { authGuard } from './core';
import { Layout } from './layout/layout';
import { CONTACTS_ROUTES } from './features/contacts/contacts.routes';
import { DashboardComponent } from './features/dashboard/dashboard';
import { ProfileComponent } from './features/profile/profile';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      {
        path: 'contacts',
        children: CONTACTS_ROUTES,
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: '/contacts', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/contacts' },
];
