import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { UiStateService } from '../../../core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, SearchPipe],
  templateUrl: './contact-list.html',
  styleUrls: [],
})
export class ContactList {
  private contactService = inject(ContactsService);
  private router = inject(Router);
  private uiState = inject(UiStateService);

  // Use shared state signals
  searchText = this.uiState.searchText;
  currentView = this.uiState.currentView;

  get contacts(): Contact[] {
    return this.contactService.contacts;
  }

  navigateToDetail(id: number): void {
    this.router.navigate(['/contacts', id]);
  }
}
