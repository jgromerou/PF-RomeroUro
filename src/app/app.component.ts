import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Usuario } from './core/models/usuario';
import { AuthService } from './core/services/auth.service';
import { selectorUsuarioActivo } from './features/auth/state/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = '3PF-RomeroUro';
  //sesionActiva: boolean;
  other_content: boolean = false;
  //logueado = JSON.parse(localStorage.getItem('session') || '{}').activa;
  usuarioActivo!: Usuario;

  constructor(public authService: AuthService, private store: Store) {
    // this.sesionActiva = localStorage.getItem('session') ? true : false;
  }

  ngOnInit() {
    this.store.select(selectorUsuarioActivo).subscribe((data) => {
      this.usuarioActivo = data.usuarioActivo;
      console.log('act23232', this.usuarioActivo.idUsuario);
      console.log('eeee', this.authService.isAuthenticated);
    });
  }
}
