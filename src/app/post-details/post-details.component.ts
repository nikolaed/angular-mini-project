import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ServicesModule } from '../services.module';
import { NgFor } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  standalone: true,
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
  imports: [ServicesModule, NgFor, MatListModule],
})
export class PostDetailsComponent {
  postId: number | undefined;
  post: any;
  comments: any[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.postId = +this.route.snapshot.params['id'];
    this.apiService.getPost(this.postId).subscribe(post => {
      this.post = post;
    });
    this.apiService.getCommentsForPost(this.postId).subscribe(comments => {
      this.comments = comments;
    });
  }
}
