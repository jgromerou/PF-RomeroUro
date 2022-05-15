import { createReducer, on } from '@ngrx/store';
import { CursoState } from 'src/app/core/models/curso.state';
import * as CursoActions from './curso.actions';

export const cursoFeatureKey = 'curso';

export const initialState: CursoState = {
  cargando: false,
  cursos: [],
};

export const cursoReducer = createReducer(
  initialState,
  on(CursoActions.cargarCursos, (state) => {
    return { ...state, cargando: true };
  }),
  on(CursoActions.cursosCargados, (state, { cursos }) => {
    return { ...state, cargando: false, cursos };
  })
);
