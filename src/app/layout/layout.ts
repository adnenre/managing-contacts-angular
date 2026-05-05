import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { UiStateService } from '../core'; // adjust path
import { AuthService } from '../core';
import {
  DropdownComponent,
  ButtonComponent,
  IconComponent,
  InputComponent,
  SidebarNavComponent,
  NavItem,
} from '../features/shared/ui';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    RouterModule,
    DropdownComponent,
    ButtonComponent,
    IconComponent,
    InputComponent,
    SidebarNavComponent,
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
})
export class Layout {
  private router = inject(Router);
  private uiState = inject(UiStateService);
  private auth = inject(AuthService);

  searchText = this.uiState.searchText;
  currentView = this.uiState.currentView;
  dropdownOpen = signal(false);

  navItems: NavItem[] = [
    { route: '/contacts', icon: 'address-book', tooltip: 'Contacts' },
    { route: '/dashboard', icon: 'tachometer', tooltip: 'Dashboard' },
    { route: '/profile', icon: 'user', tooltip: 'Profile' },
  ];

  isContactListRoute(): boolean {
    return this.router.url === '/contacts';
  }

  toggleView() {
    const newView = this.currentView() === 'contact_galery' ? 'contact_list' : 'contact_galery';
    this.uiState.setCurrentView(newView);
  }

  onSearchChange(value: string) {
    this.uiState.setSearchText(value);
  }

  toggleDropdown() {
    this.dropdownOpen.update((v) => !v);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
