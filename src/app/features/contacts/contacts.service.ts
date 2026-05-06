import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  private contactsList: Contact[] = [
    {
      id: 1,
      name: 'adnen',
      email: 'adnen.rebai@gmail.com',
      img: 'assets/images/img1.webp',
      img_header: 'assets/images/header/img1.webp',
      social: {
        twitter: 'https://twitter.com/adnen_rebai',
        linkedin: 'https://www.linkedin.com/in/adnen-rebai-65843263/',
        codepen: 'https://codepen.io/adnenrebai',
        github: 'http://adnenre.github.io',
      },
    },
    {
      id: 2,
      name: 'alex',
      email: 'alex@email.com',
      img: 'assets/images/img2.webp',
      img_header: 'assets/images/header/img2.webp',
      social: { twitter: '', linkedin: '', codepen: '', github: '' },
    },
    {
      id: 3,
      name: 'Jhon',
      email: 'Jhon@email.com',
      img: 'assets/images/img3.webp',
      img_header: 'assets/images/header/img3.webp',
      social: { twitter: '', linkedin: '', codepen: '', github: '' },
    },
    {
      id: 4,
      name: 'cristine',
      email: 'cristine@email.com',
      img: 'assets/images/img4.webp',
      img_header: 'assets/images/header/img4.webp',
      social: { twitter: '', linkedin: '', codepen: '', github: '' },
    },
    {
      id: 5,
      name: 'emline',
      email: 'emline@email.com',
      img: 'assets/images/img5.webp',
      img_header: 'assets/images/header/img5.webp',
      social: { twitter: '', linkedin: '', codepen: '', github: '' },
    },
    {
      id: 6,
      name: 'nikola',
      email: 'nikola@email.com',
      img: 'assets/images/img6.webp',
      img_header: 'assets/images/header/img6.webp',
      social: { twitter: '', linkedin: '', codepen: '', github: '' },
    },
    {
      id: 7,
      name: 'christophe',
      email: 'christophe@email.com',
      img: 'assets/images/img7.webp',
      img_header: 'assets/images/header/img7.webp',
      social: { twitter: '', linkedin: '', codepen: '', github: '' },
    },
    {
      id: 8,
      name: 'daniel',
      email: 'daniel@email.com',
      img: 'assets/images/img8.webp',
      img_header: 'assets/images/header/img8.webp',
      social: { twitter: '', linkedin: '', codepen: '', github: '' },
    },
    {
      id: 9,
      name: 'Jhonson',
      email: 'Jhonson@email.com',
      img: 'assets/images/img9.webp',
      img_header: 'assets/images/header/img9.webp',
      social: { twitter: '', linkedin: '', codepen: '', github: '' },
    },
    {
      id: 10,
      name: 'karin',
      email: 'karin@email.com',
      img: 'assets/images/img10.webp',
      img_header: 'assets/images/header/img10.webp',
      social: { twitter: '', linkedin: '', codepen: '', github: '' },
    },
    {
      id: 11,
      name: 'mikin',
      email: 'mikin@email.com',
      img: 'assets/images/img10.webp',
      img_header: 'assets/images/header/img5.webp',
      social: { twitter: '', linkedin: '', codepen: '', github: '' },
    },
  ];

  get contacts(): Contact[] {
    return this.contactsList;
  }
  getAllContacts(): Observable<Contact[]> {
    return of(this.contactsList);
  }

  getContactById(id: number): Observable<Contact | undefined> {
    return of(this.contactsList.find((c) => c.id === id));
  }
}
