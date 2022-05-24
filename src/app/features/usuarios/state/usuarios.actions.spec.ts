import * as fromUsuarios from './usuarios.actions';

describe('cargarUsuarioss', () => {
  it('should return an action', () => {
    expect(fromUsuarios.cargarUsuarioss().type).toBe('[Usuarios] Cargar Usuarioss');
  });
});
