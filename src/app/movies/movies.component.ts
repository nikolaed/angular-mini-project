import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { LoadingHandlerService } from '../services/loading-handler.service';
import { catchError } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';


@Component({
  standalone: true,
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  imports: [NgFor, MatListModule, CommonModule, RouterModule, MatButtonToggleModule, FormsModule, MatButtonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoviesComponent implements OnInit {

  movies: any[] = [];
  filteredMovies: any[] = [];
  selectedRatingCategory: string | null = null;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, public loadingService: LoadingHandlerService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  ngOnChange(): void {

  }

  getMovies(): void {
    this.loadingService.setLoading(true);

    // this.http.get<any[]>('https://dummyapi.online/api/movies')
    //   .subscribe(
    //     (response) => {
    //       this.movies = response;
    //       this.filteredMovies = response;
    //     },
    //     (error) => {
    //       console.error('Error fetching movies: ',error);
    //     }
    //   );

    setTimeout(() => {
      this.http.get<any>('https://dummyapi.online/api/movies')
        .pipe(
          catchError(error => {
            console.error('Error fetching product data:', error);
            return []; 
          })
        )
        .subscribe(response => {
          this.movies = response;
          this.filteredMovies = response;
          this.loadingService.setLoading(false);
        });
    }, 2000);
  }

  filterByRating(): void {
    if(!this.selectedRatingCategory){
      this.filteredMovies = [...this.movies];
      return;
    }

    const [lowerBound, upperBound] = this.selectedRatingCategory.split('-').map(Number);

    this.filteredMovies = this.movies.filter((movie) => {
      const rating = parseFloat(movie.rating);
      return rating >= lowerBound && rating < upperBound;
    })
  }

  resetFilter(): void {
    this.selectedRatingCategory = null;
    this.filteredMovies = [...this.movies];
  }
}
