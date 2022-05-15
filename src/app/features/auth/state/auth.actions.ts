import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/core/models/usuario';

export const cargarSesion = createAction(
  '[Auth] Cargar Sesion',
  props<{ data: Usuario }>()
);
