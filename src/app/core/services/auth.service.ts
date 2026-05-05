import { Injectable, signal } from '@angular/core';

export interface User {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedInSignal = signal<boolean>(false);
  private currentUserSignal = signal<User | null>(null);

  isLoggedIn = this.isLoggedInSignal.asReadonly();
  currentUser = this.currentUserSignal.asReadonly();

  constructor() {
    this.seedDefaultUser();
  }

  private seedDefaultUser(): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      // Add a default user
      users.push({ email: 'user@example.com', password: '123456' });
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  register(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u: User) => u.email === email)) return false;
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.email === email && u.password === password);
    if (user) {
      this.isLoggedInSignal.set(true);
      this.currentUserSignal.set(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedInSignal.set(false);
    this.currentUserSignal.set(null);
    localStorage.removeItem('currentUser');
  }

  checkAuthStatus(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.isLoggedInSignal.set(true);
      this.currentUserSignal.set(JSON.parse(user));
    }
  }
}
