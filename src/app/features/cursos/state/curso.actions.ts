import { createAction, props } from '@ngrx/store';
import { Curso } from 'src/app/core/models/curso';
/* import { Inscripcion } from 'src/app/core/models/inscripcion'; */

export const cargarCursos = createAction('[Lista Cursos] Cargar Cursos');

export const cursosCargados = createAction(
  '[Lista Cursos] Cursos Cargados',
  props<{ cursos: Curso[] }>()
);

/* export const cargarCursoconAlumnos = createAction(
  '[Lista Curso con alumnos] Cargar Curso con Alumnos'
);

export const cursoconAlumnosCargados = createAction(
  '[Lista Curso con alumnos] Curso cargado con Alumnos',
  props<{ alumnos: Inscripcion[] }>()
); */
