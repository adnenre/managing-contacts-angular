import {
  Component,
  Output,
  EventEmitter,
  signal,
  ContentChild,
  TemplateRef,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button';
import { IconComponent } from '../icon/icon';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, ButtonComponent, IconComponent],
  templateUrl: './dropdown.html',
  styleUrls: ['./dropdown.css'],
})
export class DropdownComponent {
  @Output() itemClick = new EventEmitter<string>();
  open = signal(false);

  private elementRef = inject(ElementRef);

  toggle() {
    this.open.update((v) => !v);
  }

  select(value: string) {
    this.itemClick.emit(value);
    this.open.set(false);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.open() && !this.elementRef.nativeElement.contains(event.target)) {
      this.open.set(false);
    }
  }

  @ContentChild('menuContent') menuContent?: TemplateRef<any>;
}
