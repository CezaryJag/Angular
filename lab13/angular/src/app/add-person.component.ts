import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonService, Person } from './person.service';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section style="padding:1rem; max-width:500px">
      <h2>Dodaj nową osobę</h2>
      <form #personForm="ngForm" (ngSubmit)="save()">
        <div style="margin-bottom:0.5rem">
          <label for="firstName">Imię:</label><br />
          <input
            id="firstName"
            name="firstName"
            [(ngModel)]="person.firstName"
            style="width:100%"
          />
        </div>

        <div style="margin-bottom:0.5rem">
          <label for="familyName">Nazwisko:</label><br />
          <input
            id="familyName"
            name="familyName"
            [(ngModel)]="person.familyName"
            style="width:100%"
          />
        </div>

        <div style="margin-bottom:0.5rem">
          <label for="age">Wiek:</label><br />
          <input
            id="age"
            name="age"
            type="number"
            min="0"
            [(ngModel)]="person.age"
            style="width:100%"
          />
        </div>

        <fieldset style="margin-bottom:0.5rem">
          <legend>Adres</legend>
          <div style="margin-bottom:0.5rem">
            <label for="city">Miasto:</label><br />
            <input
              id="city"
              name="city"
              [(ngModel)]="person.address.city"
              style="width:100%"
            />
          </div>
          <div style="margin-bottom:0.5rem">
            <label for="street">Ulica:</label><br />
            <input
              id="street"
              name="street"
              [(ngModel)]="person.address.street"
              style="width:100%"
            />
          </div>
          <div style="margin-bottom:0.5rem">
            <label for="postCode">Kod pocztowy:</label><br />
            <input
              id="postCode"
              name="postCode"
              [(ngModel)]="person.address.postCode"
              style="width:100%"
            />
          </div>
        </fieldset>

        <button type="submit">Zapisz</button>
      </form>
    </section>
  `
})
export class AddPersonComponent {
  person: Person = {
    address: {}
  };

  constructor(private personService: PersonService, private router: Router) {}

  save(): void {
    this.personService.add(this.person).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => console.error('Błąd podczas dodawania osoby', err)
    });
  }
}
