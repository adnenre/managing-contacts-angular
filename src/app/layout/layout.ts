import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { UiStateService } from '../core';
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
export class Layout implements OnInit, OnDestroy {
  private router = inject(Router);
  private uiState = inject(UiStateService);
  private auth = inject(AuthService);

  searchText = this.uiState.searchText;
  currentView = this.uiState.currentView;
  dropdownOpen = signal(false);
  sidebarCollapsed = signal(false);
  isMobile = signal(false);

  private resizeObserver: (() => void) | null = null;

  navItems: NavItem[] = [
    { route: '/contacts', icon: 'address-book', tooltip: 'Contacts' },
    { route: '/dashboard', icon: 'tachometer', tooltip: 'Dashboard' },
    { route: '/profile', icon: 'user', tooltip: 'Profile' },
  ];

  ngOnInit() {
    this.checkScreenSize();
    this.resizeObserver = () => this.checkScreenSize();
    window.addEventListener('resize', this.resizeObserver);
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      window.removeEventListener('resize', this.resizeObserver);
    }
  }

  private checkScreenSize() {
    const mobile = window.innerWidth <= 768;
    this.isMobile.set(mobile);
    // Auto‑collapse sidebar on mobile; on desktop you may choose to expand it
    if (mobile) {
      this.sidebarCollapsed.set(true);
    } else {
      // Optional: on desktop you could set to false, but keep user preference?
      // Here we only auto‑expand on desktop if it was never touched.
      // Simpler: leave as is (respect previous toggle).
      // If you want auto‑expand on desktop when coming from mobile, uncomment next line:
      // if (this.sidebarCollapsed() === true) this.sidebarCollapsed.set(false);
    }
  }

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

  toggleSidebar() {
    this.sidebarCollapsed.update((v) => !v);
  }
}
