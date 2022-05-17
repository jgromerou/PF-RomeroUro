import * as fromInscripciones from './inscripciones.actions';

describe('cargarInscripcioness', () => {
  it('should return an action', () => {
    expect(fromInscripciones.cargarInscripcioness().type).toBe('[Inscripciones] Cargar Inscripcioness');
  });
});
