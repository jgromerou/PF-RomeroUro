import { createAction, props } from '@ngrx/store';
import { Inscripcion } from 'src/app/core/models/inscripcion';

export const cargarInscripciones = createAction(
  '[Lista Inscripciones] Cargar Inscripciones'
);

export const inscripcionesCargadas = createAction(
  '[Lista Inscripciones] Inscripciones Cargadas',
  props<{ inscripciones: Inscripcion[] }>()
);

export const cargarInscripcionesCurso = createAction(
  '[Lista Inscripciones por Curso] Cargar Inscripciones por curso',
  props<{ idCurso: number }>()
);

export const inscripcionesCargadasCurso = createAction(
  '[Lista Inscripciones cargadas por curso] Inscripciones cargadas por curso',
  props<{ inscripciones: Inscripcion[] }>()
);
