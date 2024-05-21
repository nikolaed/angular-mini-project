import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [HttpClientModule, NavbarComponent],
  providers: [ApiService],
  declarations: [
  ],
})
export class ServicesModule {}
