import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../icon/icon';

export interface NavItem {
  route: string;
  icon: string;
  tooltip: string;
}

@Component({
  selector: 'app-sidebar-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './sidebar-nav.html',
  styleUrls: ['./sidebar-nav.css'],
})
export class SidebarNavComponent {
  @Input() items: NavItem[] = [];
}
