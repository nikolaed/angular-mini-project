import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { MyLibModule } from 'projects/my-lib/src/public-api';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { MatListModule } from '@angular/material/list';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <main>
      <a [routerLink]="['']">
        <header class="brand-name">
          <img
            class="brand-logo"
            src="/assets/logo.svg"
            alt="logo"
            aria-hidden="true" />
        </header>
      </a>
      <section class="content">
        <app-navbar></app-navbar>
        <br />
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
  imports: [
    HomeComponent,
    RouterModule,
    MyLibModule,
    HttpClientModule,
    NavbarComponent,
    MatListModule
  ],
})
export class AppComponent {
  title = 'homes';
}
