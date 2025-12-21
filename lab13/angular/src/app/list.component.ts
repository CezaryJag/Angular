import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PersonService, Person } from './person.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section style="padding:1rem">
      <h2>Lista osób</h2>

      <ul>
        @for (person of persons; track $index; let i = $index) {
          <li>
            <a [routerLink]="['/details', person.id]">
              {{ person.firstName }} {{ person.familyName }}
            </a>
            <button type="button" (click)="delete(person.id)" style="margin-left:0.5rem">
              Usuń
            </button>
          </li>
        }
      </ul>

      <p>
        <a routerLink="/add">Dodaj nową osobę</a>
      </p>
    </section>
  `
})
export class ListComponent implements OnInit {
  persons: Person[] = [];

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.loadPersons();
  }

  private loadPersons(): void {
    this.personService.getAll().subscribe({
      next: data => (this.persons = data || []),
      error: err => {
        console.error('Błąd podczas ładowania listy osób', err);
        this.persons = [];
      }
    });
  }

  delete(id?: number | null): void {
    if (id == null) {
      console.warn('Brak id osoby do usunięcia');
      return;
    }
    this.personService.delete(id).subscribe({
      next: () => this.loadPersons(),
      error: err => console.error('Błąd podczas usuwania osoby', err)
    });
  }
}
