import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { ServicesModule } from '../services.module';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  standalone: true,
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  imports: [
    RouterModule,
    CommonModule,
    NgFor,
    ServicesModule,
    MatCardModule,
    MatListModule,
  ],
})
export class PostsComponent {
  posts: any[] | undefined;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
}
