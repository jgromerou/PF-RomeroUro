import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Inscripcion } from '../models/inscripcion';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  inscripcionSubject = new Subject<any>();
  URL_SERVICIOS = environment.URL_SERVICIOS;

  constructor(private http: HttpClient) {}

  obtenerDatosInscripciones(): Observable<any> {
    return this.http.get<any>(`${environment.URL_SERVICIOS}/Inscripciones`);
  }

  obtenerDatosInscripcionesFiltradoCurso(inscripcion: any): Observable<any> {
    return this.http.get<any>(
      `${environment.URL_SERVICIOS}/Inscripciones?idCurso=${inscripcion.idCurso}`
    );
  }

  obtenerDatosInscripcionesFiltradoAlumno(inscripcion: any): Observable<any> {
    return this.http.get<any>(
      `${environment.URL_SERVICIOS}/Inscripciones?idAlumno=${inscripcion}`
    );
  }

  /* obtenerDatosAlumnos(): Observable<any> {
    return this.http.get(`${environment.URL_SERVICIOS}/Alumnos`);
  }
  obtenerDatosCursoconalumnos(curso: any): Observable<any> {
    return this.http.get(
      `${environment.URL_SERVICIOS}/Inscripciones?idCurso=${curso}`
    );
  } */

  agregarInscripcion(inscripcion: Inscripcion) {
    return this.http
      .post(`${environment.URL_SERVICIOS}/Inscripciones`, inscripcion)
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

  editarInscripcion(inscripcion: Inscripcion) {
    return this.http
      .put(
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

  eliminarInscripcion(inscripcion: Inscripcion) {
    return this.http
      .delete(
        `${environment.URL_SERVICIOS}/Inscripciones/${inscripcion.idInscripcion}`
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
