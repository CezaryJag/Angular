import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section style="padding:1rem">
      <h2>About</h2>
      <p>To przykładowa strona 'About' - pokazuje jak działa routing.</p>
    </section>
  `
})
export class AboutComponent {}

