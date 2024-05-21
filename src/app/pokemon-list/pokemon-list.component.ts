import { CommonModule, NgFor, SlicePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../services/pagination.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LoadingHandlerService } from '../services/loading-handler.service';
import { catchError } from 'rxjs';

@Component({
  standalone:true, 
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  imports: [NgFor, SlicePipe, MatPaginatorModule, CommonModule, MatButtonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PokemonListComponent implements OnInit {

  pokemonList: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  pageSize: number = 5;
  currPage: number = 0;
  showErrorMessage: boolean = false;

  constructor(private http: HttpClient, public paginationService: PaginationService, public loadingService: LoadingHandlerService) { }

  ngOnInit(): void {
    this.fetchPokemonList();
  }

  fetchPokemonList(): void {

    this.loadingService.setLoading(true);

    setTimeout(() => {
      this.http.get<any>('https://dummyapi.online/api/pokemon')
        .pipe(
          catchError(error => {
            console.error('Error fetching product data:', error);
            this.showErrorMessage = true;
            return [];
          })
        )
        .subscribe(response => {
          this.pokemonList = response;
          this.paginationService.setTotalItems(this.pokemonList.length);
          this.loadingService.setLoading(false);
          this.showErrorMessage = false;
        });
    }, 2000);
    // this.http.get<any[]>('https://dummyapi.online/api/pokemon')
    //   .subscribe(
    //     (response) => {
    //       this.pokemonList = response;
    //       // this.totalPages = Math.ceil(this.pokemonList.length / this.itemsPerPage);
    //       // this.totalPagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
    //       this.paginationService.setTotalItems(this.pokemonList.length);

    //     },
    //     (error) => {
    //       console.error('Error fetching Pokemon list: ',error);
    //     }
    //   )
  }

  getPageItems(): any[] {
    const startIndex = (this.currentPage-1) * this.itemsPerPage;
    const endIndex = startIndex+this.itemsPerPage;
    return this.pokemonList.slice(startIndex,endIndex);
  }

  goToPage(page: number): void {
      this.currentPage = page;
  }

  nextPage(): void {
    if(this.currentPage < this.totalPages){
      this.currentPage++;
    }
  }

  prevPage(): void {
    if(this.currentPage > 1){
      this.currentPage--;
    }
  }

  sortPokemonByHitPoints(): void{
    this.pokemonList.sort((a, b) => a.hitpoints - b.hitpoints);
  }

  sortPokemonDescending() {
    this.pokemonList.sort((a, b) => b.hitpoints - a.hitpoints);
  }

  getStartIndex(): number {
    return this.currPage * this.pageSize;
  }

  getEndIndex(): number {
    return (this.currPage+1)*this.pageSize;
  }

  onPageChange(event: any): void{
    this.currPage = event.pageIndex;
  }





}
