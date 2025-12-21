import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PersonService, Person } from './person.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section style="padding:1rem">
      <h2>Szczegóły osoby</h2>

      <ng-container *ngIf="person; else noPerson">
        <p><strong>Imię:</strong> {{ person.firstName }}</p>
        <p><strong>Nazwisko:</strong> {{ person.familyName }}</p>
        <p><strong>Wiek:</strong> {{ person.age }}</p>
        <p><strong>Adres:</strong></p>
        <ul>
          <li><strong>Miasto:</strong> {{ person.address?.city }}</li>
          <li><strong>Ulica:</strong> {{ person.address?.street }}</li>
          <li><strong>Kod pocztowy:</strong> {{ person.address?.postCode }}</li>
        </ul>
      </ng-container>

      <ng-template #noPerson>
        <p>Nie znaleziono osoby o wskazanym identyfikatorze.</p>
      </ng-template>

      <p>
        <a routerLink="/">Powrót do listy osób</a>
      </p>
    </section>
  `
})
export class DetailsComponent {
  person: Person | null = null;

  constructor(private route: ActivatedRoute, private personService: PersonService) {
    this.route.paramMap.subscribe(params => {
      const param = params.get('id');
      const index = param !== null ? Number(param) : NaN;
      if (!isNaN(index)) {
        this.personService.getByIndex(index).subscribe({
          next: p => (this.person = p),
          error: err => {
            console.error('Błąd podczas pobierania osoby', err);
            this.person = null;
          }
        });
      } else {
        this.person = null;
      }
    });
  }
}
