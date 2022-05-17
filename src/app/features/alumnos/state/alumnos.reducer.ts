import { Action, createReducer, on } from '@ngrx/store';
import * as AlumnosActions from './alumnos.actions';

export const alumnosFeatureKey = 'alumnos';

export interface State {}

export const initialState: State = {};

export const alumnoReducer = createReducer(
  initialState,

  on(AlumnosActions.cargarAlumnoss, (state) => state)
);
