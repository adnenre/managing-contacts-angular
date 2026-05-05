import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-detail.html',
  styleUrls: [],
})
export class ContactDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private contactsService = inject(ContactsService);

  contactInfo: Contact | undefined;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contactsService.getContactById(parseInt(id, 10)).subscribe((contact) => {
        this.contactInfo = contact;
      });
    }
  }
}
