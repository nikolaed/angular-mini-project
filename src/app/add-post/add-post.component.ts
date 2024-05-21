import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServicesModule } from '../services.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [
    FormsModule,
    ServicesModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent {
  addPostForm!: FormGroup;

  newPost = { title: '', body: '' };

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  addPost(): void {
    if (this.addPostForm.valid) {
      const newPost = this.addPostForm.value;
      this.apiService.addPost(newPost).subscribe(post => {
        console.log('Post added: ', post);
        this.addPostForm.reset();
      });
    }
  }
}
