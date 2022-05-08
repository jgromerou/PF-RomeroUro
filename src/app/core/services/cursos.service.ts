import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Curso } from './../models/curso';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CursosService {
  cursoSubject = new Subject<Curso>();
  URL_SERVICIOS = environment.URL_SERVICIOS;

  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any> {
    return this.http.get(`${environment.URL_SERVICIOS}/Cursos`);
  }

  agregarCursos(curso: Curso): Observable<any> {
    return this.http.post(`${environment.URL_SERVICIOS}/Cursos`, curso).pipe(
      tap(
        // Log the result or error
        {
          next: () => {
            this.cursoSubject.next(curso);
            console.log('curso: ', curso);
          },
          error: (error) => console.log(error),
        }
      )
    );
  }

  editarCurso(curso: Curso): Observable<any> {
    return this.http
      .put(`${environment.URL_SERVICIOS}/Cursos/${curso.idCurso}`, curso)
      .pipe(
        tap(
          // Log the result or error
          {
            next: () => {
              console.log('editar idcurso', curso.idCurso);
              this.cursoSubject.next(curso);
            },

            error: (error) => console.log(error),
          }
        )
      );
  }

  eliminarCurso(curso: Curso) {
    return this.http
      .delete(`${environment.URL_SERVICIOS}/Cursos/${curso.idCurso}`)
      .pipe(
        tap(
          // Log the result or error
          {
            next: () => {
              this.cursoSubject.next(curso);
            },

            error: (error) => console.log(error),
          }
        )
      );
  }
}
