import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  logueado!: any;

  usuarioSubject = new Subject<any>();
  URL_SERVICIOS = environment.URL_SERVICIOS;

  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any> {
    return this.http.get(`${environment.URL_SERVICIOS}/Usuarios`);
  }

  agregarUsuarios(usuario: any) {
    return this.http
      .post(`${environment.URL_SERVICIOS}/Usuarios`, usuario)
      .pipe(
        tap(
          // Log the result or error
          {
            next: () => {
              this.usuarioSubject.next(usuario);
            },
            error: (error) => console.log(error),
          }
        )
      );
  }

  editarUsuario(usuario: any) {
    return this.http
      .put(
        `${environment.URL_SERVICIOS}/Usuarios/${usuario.idUsuario}`,
        usuario
      )
      .pipe(
        tap(
          // Log the result or error
          {
            next: () => {
              this.usuarioSubject.next(usuario);
            },

            error: (error) => console.log(error),
          }
        )
      );
  }

  eliminarUsuario(usuario: any) {
    return this.http
      .delete(
        `${environment.URL_SERVICIOS}/Usuarios/${usuario.idUsuario}`,
        usuario
      )
      .pipe(
        tap(
          // Log the result or error
          {
            next: () => {
              this.usuarioSubject.next(usuario);
            },

            error: (error) => console.log(error),
          }
        )
      );
  }
}
