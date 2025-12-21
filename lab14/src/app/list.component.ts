import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PersonService, Person } from './person.service';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatListModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  template: `
    <section class="person-list-page">
      <h2>Lista osób</h2>

      <mat-nav-list>
        @for (person of persons; track $index; let i = $index) {
          <a mat-list-item [routerLink]="['/details', i]">
            <mat-icon matListItemIcon>person</mat-icon>
            <span matListItemTitle>{{ person.firstName }} {{ person.familyName }}</span>
            <span matListItemLine>Wiek: {{ person.age ?? '-' }}</span>
            <button
              mat-icon-button
              color="warn"
              class="person-delete-button"
              type="button"
              (click)="delete(i); $event.preventDefault(); $event.stopPropagation();"
            >
              <mat-icon>delete</mat-icon>
            </button>
          </a>
        }
      </mat-nav-list>

      <div class="person-list-actions">
        <button mat-raised-button color="primary" routerLink="/add" class="person-add-button">
          <mat-icon>person_add</mat-icon>
          Dodaj nową osobę
        </button>
      </div>
    </section>
  `
})
export class ListComponent implements OnInit {
  persons: Person[] = [];

  constructor(private personService: PersonService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadPersons();
  }

  private loadPersons(): void {
    this.persons = this.personService.getAll();
  }

  delete(index: number): void {
    this.personService.delete(index);
    this.loadPersons();
    this.snackBar.open('Osoba została usunięta', 'Zamknij', {
      duration: 3000,
      panelClass: ['azure-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
