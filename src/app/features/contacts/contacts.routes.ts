import { Routes } from '@angular/router';
import { ContactList } from './contact-list/contact-list';
import { ContactDetail } from './contact-detail/contact-detail';

export const CONTACTS_ROUTES: Routes = [
  { path: '', component: ContactList },
  { path: ':id', component: ContactDetail },
];
