import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule, NgIf, MatButtonModule, MatToolbarModule],
})
export class NavbarComponent implements OnInit {
  
  @Output() moviesLinkClicked: EventEmitter<void> = new EventEmitter<void>();


  constructor(private router: Router) {}

  ngOnInit() : void {
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  logout(): void {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

  goToMovies(): void {
    this.router.navigate(['/movies']).then(() => {
      // const moviesComponent = document.querySelector('app-movies') as any;
      // if (moviesComponent) {
      //   moviesComponent.resetFilter(); // Reset the filter
      // }
    });
  }
  
}
