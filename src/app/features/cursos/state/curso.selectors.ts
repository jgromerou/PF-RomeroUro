import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CursoState } from 'src/app/core/models/curso.state';
import { InscripcionState } from 'src/app/core/models/inscripcion.state';
import * as fromCurso from './curso.reducer';

export const selectorCurso = createFeatureSelector<CursoState>(
  fromCurso.cursoFeatureKey
);

/* export const selectorInscripcion = createFeatureSelector<InscripcionState>(
  fromCurso.cursoFeatureKey
); */

export const selectorCargandoCursos = createSelector(
  selectorCurso,
  (state: CursoState) => state.cargando
);

export const selectorListaCursos = createSelector(
  selectorCurso,
  (state: CursoState) => state.cursos
);

/* export const selectorCargandoAlumnosCursos = createSelector(
  selectorInscripcion,
  (state: InscripcionState) => state.cargando
);

export const selectorListaCursoconAlumnos = createSelector(
  selectorInscripcion,
  (state: InscripcionState) => state.inscripcionAlumnos
); */
