import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section style="padding:1rem; text-align:center">
      <h2>404 - Nie znaleziono strony</h2>
      <p>Adres, który podałeś, nie istnieje w tej aplikacji.</p>
      <p>
        <a routerLink="/">Przejdź na stronę główną</a>
        &nbsp;|&nbsp;
        <a routerLink="/people">Przejdź do listy osób</a>
      </p>
    </section>
  `
})
export class NotFoundComponent {}

