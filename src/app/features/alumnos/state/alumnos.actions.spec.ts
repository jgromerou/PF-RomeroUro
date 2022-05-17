import * as fromAlumnos from './alumnos.actions';

describe('cargarAlumnoss', () => {
  it('should return an action', () => {
    expect(fromAlumnos.cargarAlumnoss().type).toBe('[Alumnos] Cargar Alumnoss');
  });
});
