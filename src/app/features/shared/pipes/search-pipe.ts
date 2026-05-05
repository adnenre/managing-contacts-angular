import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../../contacts/contact.model';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(contacts: Contact[], searchText: string): Contact[] {
    if (!contacts) {
      return [];
    }
    if (!searchText) {
      return contacts;
    }
    searchText = searchText.toLowerCase();
    return contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(searchText);
    });
  }
}
