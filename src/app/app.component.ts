import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = '3PF-RomeroUro';
  //sesionActiva: boolean;
  other_content: boolean = false;
  //logueado = JSON.parse(localStorage.getItem('session') || '{}').activa;

  constructor(public authService: AuthService) {
    // this.sesionActiva = localStorage.getItem('session') ? true : false;
  }
}
