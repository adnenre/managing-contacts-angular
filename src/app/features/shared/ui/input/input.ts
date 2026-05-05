import { Component, Input, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { IconComponent } from '../icon/icon';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './input.html',
  styleUrls: ['./input.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() placeholder = '';
  @Input() name = '';
  @Input() id = '';
  @Input() disabled = false;
  @Input() errorMessage = '';
  @Input() leftIcon?: string;
  @Input() showPasswordToggle = false;
  @Input() class: string = ''; // external custom classes

  // Internal state
  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};
  showPassword = signal(false);

  // Safely combine base class with custom classes (no trailing space)
  get wrapperClass(): string {
    return this.class ? `input-wrapper ${this.class}` : 'input-wrapper';
  }

  get inputType(): string {
    return this.type === 'password' && this.showPassword() ? 'text' : this.type;
  }

  ngOnInit() {
    if (this.type === 'password') {
      this.showPasswordToggle = true;
    }
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value = value || '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  togglePassword() {
    this.showPassword.update((v) => !v);
  }
}
