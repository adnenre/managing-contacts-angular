import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `<i [class]="'fa fa-' + name"></i>`,
})
export class IconComponent {
  @Input({ required: true }) name!: string; // e.g., 'user-circle', 'address-book'
}
