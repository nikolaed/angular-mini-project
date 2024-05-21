import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { PostsComponent } from './posts/posts.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { AddPostComponent } from './add-post/add-post.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { MoviesComponent } from './movies/movies.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { ProductsComponent } from './products/products.component';
import { PhotoAlbumComponent } from './photo-album/photo-album.component';
import { UserComponent } from './user/user.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Details Page',
  },
  {
    path: 'posts',
    component: PostsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'posts/:id',
    component: PostDetailsComponent,
  },
  {
    path: 'add-post',
    component: AddPostComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'movies',
    component: MoviesComponent,
  },
  {
    path: 'pokemons',
    component: PokemonListComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'photoAlbum',
    component: PhotoAlbumComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },

  
];

export default routeConfig;
