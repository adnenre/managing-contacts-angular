import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { InputComponent, ButtonComponent } from '../../shared/ui';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, InputComponent, ButtonComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  emailError = signal('');
  passwordError = signal('');
  loginError = signal('');

  isEmailValid = computed(() => {
    const val = this.email().trim();
    return val !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  });
  isPasswordValid = computed(() => this.password().trim().length >= 6);
  isFormValid = computed(() => this.isEmailValid() && this.isPasswordValid());

  validateEmail() {
    const val = this.email().trim();
    if (!val) this.emailError.set('');
    else if (!this.isEmailValid()) this.emailError.set('Enter a valid email address');
    else this.emailError.set('');
  }
  validatePassword() {
    const val = this.password().trim();
    if (!val) this.passwordError.set('');
    else if (val.length < 6) this.passwordError.set('Password must be at least 6 characters');
    else this.passwordError.set('');
  }

  onSubmit() {
    this.loginError.set('');
    this.validateEmail();
    this.validatePassword();
    if (!this.isFormValid()) return;

    const success = this.auth.login(this.email(), this.password());
    if (success) {
      this.router.navigate(['/']);
    } else {
      this.loginError.set('Invalid email or password');
    }
  }
}
