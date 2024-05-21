import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoadingHandlerService } from '../services/loading-handler.service';
import { catchError } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [NgIf, NgFor, CommonModule, MatButtonModule]
})
export class ProductsComponent {

  products: any[] = [];
  showLoadingImage: boolean | undefined;

  constructor(private http: HttpClient, public loadingService: LoadingHandlerService) {}

  // loadProducts(): void {
  //   this.loadingService.showLoadingImage(); 
    
  //   this.http.get<any[]>('https://dummyapi.online/api/products')
  //     .subscribe(
  //       (products) => {
  //         this.products = products;
  //         this.loadingService.hideLoadingImage(); 
  //       },
  //       (error) => {
  //         console.error('Error loading products:', error);
  //         this.loadingService.hideLoadingImage(); 
  //       }
  //     );
  // }

  // loadProducts(): void {
  //   this.loadingService.setLoadingWithDelay(2000).subscribe(() => {
  //     this.http.get<any[]>('https://dummyapi.online/api/products').subscribe(
  //       (products) => {
  //         this.products = products;
  //       },
  //       (error) => {
  //         console.error('Error loading products:', error);
  //         this.loadingService.setLoading(true); 
  //       }
  //     );
  //   });
  // }


  // fetchProducts(): void {
  //   
  //   this.loadingService.setLoadingWithDelay(2000).subscribe(() => {
  //     this.http.get<any>('https://dummyapi.online/api/products')
  //       .pipe(
  //         catchError(error => {
  //           console.error('Error fetching product data:', error);
  //           return []; 
  //         })
  //       )
  //       .subscribe(products => {
  //         this.products = products;
  //       });
  //   });
  // }

  isFetching: boolean = false;
  showErrorMessage: boolean = false;

  fetchProducts(): void {
    this.loadingService.setLoading(true);
    this.isFetching = true;

    setTimeout(() => {
      this.isFetching = false;
      this.http.get<any>('https://dummyapi.online/api/products')
        .pipe(
          catchError(error => {
            console.error('Error fetching product data:', error);
            this.showErrorMessage = true;
            return []; 
          })
        )
        .subscribe(products => {
          this.products = products;
          this.loadingService.setLoading(false);
        });
    }, 2000);
  }

  
}
