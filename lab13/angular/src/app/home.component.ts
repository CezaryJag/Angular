import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <section style="padding:1rem">
      <h2>Home</h2>
      <p>Witamy na stronie głównej aplikacji z routingu.</p>
    </section>
  `
})
export class HomeComponent {}

