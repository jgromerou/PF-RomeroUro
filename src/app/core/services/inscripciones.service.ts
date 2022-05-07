import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Inscripcion } from '../models/inscripcion';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  inscripcionSubject = new Subject<Inscripcion>();
  URL_SERVICIOS = environment.URL_SERVICIOS;

  constructor(private http: HttpClient) {}

  obtenerDatosInscripciones(): Observable<any> {
    return this.http.get(`${environment.URL_SERVICIOS}/Inscripciones`);
  }

  obtenerDatosAlumnos(): Observable<any> {
    return this.http.get(`${environment.URL_SERVICIOS}/Alumnos`);
  }
  obtenerDatosCursos(): Observable<any> {
    return this.http.get(`${environment.URL_SERVICIOS}/Cursos`);
  }

  agregarInscripcion(curso: any) {
    return this.http
      .post(`${environment.URL_SERVICIOS}/Inscripciones`, curso)
      .pipe(
        tap(
          // Log the result or error
          {
            next: () => {
              this.inscripcionSubject.next(curso);
            },
            error: (error) => console.log(error),
          }
        )
      );
  }

  editarInscripcion(inscripcion: any) {
    return this.http
      .put(
        `${environment.URL_SERVICIOS}/Inscripciones/${inscripcion.idCurso}`,
        inscripcion
      )
      .pipe(
        tap(
          // Log the result or error
          {
            next: () => {
              this.inscripcionSubject.next(inscripcion);
            },

            error: (error) => console.log(error),
          }
        )
      );
  }

  eliminarInscripcion(inscripcion: any) {
    return this.http
      .delete(
        `${environment.URL_SERVICIOS}/Inscripciones/${inscripcion.idInscripcion}`,
        inscripcion
      )
      .pipe(
        tap(
          // Log the result or error
          {
            next: () => {
              this.inscripcionSubject.next(inscripcion);
            },

            error: (error) => console.log(error),
          }
        )
      );
  }
}
