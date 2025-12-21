import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PersonService, Person } from './person.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatListModule, MatIconModule, MatButtonModule],
  template: `
    <section class="person-details-page">
      <mat-card *ngIf="person; else noPerson" class="person-details-card">
        <mat-card-header class="person-details-header">
          <div mat-card-avatar class="person-avatar">
            <mat-icon>person</mat-icon>
          </div>
          <mat-card-title>{{ person?.firstName }} {{ person?.familyName }}</mat-card-title>
          <mat-card-subtitle>Wiek: {{ person?.age ?? '-' }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <h3>Adres</h3>
          <mat-list>
            <mat-list-item>
              <mat-icon matListItemIcon>location_city</mat-icon>
              <span matListItemTitle>Miasto</span>
              <span matListItemLine>{{ person?.address?.city || '-' }}</span>
            </mat-list-item>
            <mat-list-item>
              <mat-icon matListItemIcon>home</mat-icon>
              <span matListItemTitle>Ulica</span>
              <span matListItemLine>{{ person?.address?.street || '-' }}</span>
            </mat-list-item>
            <mat-list-item>
              <mat-icon matListItemIcon>markunread_mailbox</mat-icon>
              <span matListItemTitle>Kod pocztowy</span>
              <span matListItemLine>{{ person?.address?.postCode || '-' }}</span>
            </mat-list-item>
          </mat-list>
        </mat-card-content>
        <mat-card-actions>
          <button mat-stroked-button color="primary" routerLink="/">
            <mat-icon>arrow_back</mat-icon>
            Powrót do listy osób
          </button>
        </mat-card-actions>
      </mat-card>

      <ng-template #noPerson>
        <mat-card class="person-not-found-card">
          <mat-card-title>Nie znaleziono osoby</mat-card-title>
          <mat-card-content>
            Nie znaleziono osoby o wskazanym identyfikatorze.
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/">
              <mat-icon>arrow_back</mat-icon>
              Powrót do listy osób
            </button>
          </mat-card-actions>
        </mat-card>
      </ng-template>
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
        this.person = this.personService.getByIndex(index);
      } else {
        this.person = null;
      }
    });
  }
}
