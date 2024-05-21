import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-photo-album',
  templateUrl: './photo-album.component.html',
  styleUrls: ['./photo-album.component.css'],
  imports: [MatTabsModule, CommonModule, FormsModule, NgFor],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PhotoAlbumComponent implements OnInit{

  albums: { [key:number] : any[] } = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/photos')
      .subscribe(photos => {
        photos.forEach(photo => {
          const albumId = photo.albumId;
          const adjustedAlbumId = albumId - 1;

          if(!this.albums[adjustedAlbumId]){
            this.albums[adjustedAlbumId] = [];
          }

          this.albums[adjustedAlbumId].push(photo);
        })
      })
  }

  getAlbumKeys(): number[] {
    return Object.keys(this.albums).map(Number);
  }


}
