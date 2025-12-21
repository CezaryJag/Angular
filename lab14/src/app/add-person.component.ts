import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonService, Person } from './person.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  template: `
    <section class="add-person-page">
      <mat-card class="add-person-card">
        <mat-card-title>Dodaj nową osobę</mat-card-title>
        <mat-card-content>
          <form #personForm="ngForm" (ngSubmit)="save()">
            <mat-form-field appearance="outline" subscriptSizing="dynamic" class="form-field-wide">
              <mat-label>Imię</mat-label>
              <input
                matInput
                id="firstName"
                name="firstName"
                [(ngModel)]="person.firstName"
              />
            </mat-form-field>

            <mat-form-field appearance="outline" subscriptSizing="dynamic" class="form-field-wide">
              <mat-label>Nazwisko</mat-label>
              <input
                matInput
                id="familyName"
                name="familyName"
                [(ngModel)]="person.familyName"
              />
            </mat-form-field>

            <mat-form-field appearance="outline" subscriptSizing="dynamic" class="form-field-wide">
              <mat-label>Wiek</mat-label>
              <input
                matInput
                id="age"
                name="age"
                type="number"
                min="0"
                [(ngModel)]="person.age"
              />
            </mat-form-field>

            <h3 class="address-header">Adres</h3>

            <mat-form-field appearance="outline" subscriptSizing="dynamic" class="form-field-wide">
              <mat-label>Miasto</mat-label>
              <input
                matInput
                id="city"
                name="city"
                [(ngModel)]="person.address.city"
              />
            </mat-form-field>
            <mat-form-field appearance="outline" subscriptSizing="dynamic" class="form-field-wide">
              <mat-label>Ulica</mat-label>
              <input
                matInput
                id="street"
                name="street"
                [(ngModel)]="person.address.street"
              />
            </mat-form-field>
            <mat-form-field appearance="outline" subscriptSizing="dynamic" class="form-field-wide">
              <mat-label>Kod pocztowy</mat-label>
              <input
                matInput
                id="postCode"
                name="postCode"
                [(ngModel)]="person.address.postCode"
              />
            </mat-form-field>

            <div class="form-actions">
              <button mat-raised-button color="primary" class="save-button" type="submit">
                <mat-icon>save</mat-icon>
                Zapisz
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </section>
  `
})
export class AddPersonComponent {
  person: Person = {
    address: {}
  };

  constructor(private personService: PersonService, private router: Router, private snackBar: MatSnackBar) {}

  save(): void {
    this.personService.add(this.person);
    this.snackBar.open('Osoba została dodana', 'Zamknij', {
      duration: 3000,
      panelClass: ['azure-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
    this.router.navigate(['/']);
  }
}
