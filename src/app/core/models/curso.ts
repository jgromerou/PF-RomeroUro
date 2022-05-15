/* export class Curso {
  constructor(
    public idCurso: number,
    public curso: string,
    public descripcion: string,
    public horas: string
  ) {}
} */

export interface Curso {
  idCurso: string;
  curso: string;
  descripcion: string;
  horas: string;
}
