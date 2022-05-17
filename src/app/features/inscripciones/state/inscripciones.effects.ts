import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, exhaustMap, map } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import * as InscripcionesActions from './inscripciones.actions';
import { cursosCargados } from '../../cursos/state/curso.actions';
import {
  cargarInscripciones,
  cargarInscripcionesCurso,
  inscripcionesCargadas,
  inscripcionesCargadasCurso,
} from './inscripciones.actions';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';

@Injectable()
export class InscripcionesEffects {
  cargarInscripcionesEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(cargarInscripciones),
      exhaustMap(() =>
        this.inscripcionesService
          .obtenerDatosInscripciones()
          .pipe(
            map((inscripciones) => inscripcionesCargadas({ inscripciones }))
          )
      )
    )
  );

  cargarInscripcionesCursoEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(cargarInscripcionesCurso),
      exhaustMap((idCurso) =>
        this.inscripcionesService
          .obtenerDatosInscripcionesFiltradoCurso(idCurso)
          .pipe(
            map((inscripciones) =>
              inscripcionesCargadasCurso({ inscripciones })
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private inscripcionesService: InscripcionesService
  ) {}
}
