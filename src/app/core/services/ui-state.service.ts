import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiStateService {
  // Signals for shared UI state
  searchText = signal<string>('');
  currentView = signal<'contact_galery' | 'contact_list'>('contact_galery');

  setSearchText(text: string) {
    this.searchText.set(text);
  }

  setCurrentView(view: 'contact_galery' | 'contact_list') {
    this.currentView.set(view);
  }
}
