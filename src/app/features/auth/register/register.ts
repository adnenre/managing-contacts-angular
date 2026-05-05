import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { InputComponent, ButtonComponent } from '../../shared/ui';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, InputComponent, ButtonComponent],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  private auth = inject(AuthService);
  private router = inject(Router);

  // Form fields
  email = signal('');
  password = signal('');
  confirmPassword = signal('');

  // Field errors
  emailError = signal('');
  passwordError = signal('');
  confirmPasswordError = signal('');
  registerError = signal('');

  // Computed validations
  isEmailValid = computed(() => {
    const val = this.email().trim();
    return val !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  });
  isPasswordValid = computed(() => this.password().trim().length >= 6);
  doPasswordsMatch = computed(() => this.password() === this.confirmPassword());

  isFormValid = computed(
    () => this.isEmailValid() && this.isPasswordValid() && this.doPasswordsMatch(),
  );

  // Dynamic error messages (reactive)
  emailErrorMessage = computed(() => {
    const val = this.email().trim();
    if (!val) return '';
    return this.isEmailValid() ? '' : 'Enter a valid email address';
  });

  passwordErrorMessage = computed(() => {
    const val = this.password().trim();
    if (!val) return '';
    return this.isPasswordValid() ? '' : 'Password must be at least 6 characters';
  });

  confirmPasswordErrorMessage = computed(() => {
    const confirm = this.confirmPassword().trim();
    if (!confirm) return '';
    return this.doPasswordsMatch() ? '' : 'Passwords do not match';
  });

  // Update error signals from computed values (optional – you can directly bind signals)
  validateForm() {
    this.emailError.set(this.emailErrorMessage());
    this.passwordError.set(this.passwordErrorMessage());
    this.confirmPasswordError.set(this.confirmPasswordErrorMessage());
  }

  onSubmit() {
    this.registerError.set('');
    this.validateForm();

    if (!this.isFormValid()) return;

    const success = this.auth.register(this.email(), this.password());
    if (success) {
      this.router.navigate(['/login']);
    } else {
      this.registerError.set('User already exists');
    }
  }
}
