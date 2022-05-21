import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DialogCurso } from 'src/app/core/interfaces/dialogCurso';
import { Inscripcion } from 'src/app/core/models/inscripcion';
import { AuthService } from 'src/app/core/services/auth.service';
import { CursosService } from 'src/app/core/services/cursos.service';
import {
  cargarInscripcionesCurso,
  inscripcionesCargadasCurso,
} from 'src/app/features/inscripciones/state/inscripciones.actions';
import {
  selectorCargandoInscripciones,
  selectorListaInscripcionesCurso,
} from 'src/app/features/inscripciones/state/inscripciones.selectors';

@Component({
  selector: 'app-ver-curso',
  templateUrl: './ver-curso.component.html',
  styleUrls: ['./ver-curso.component.css'],
})
export class VerCursoComponent implements OnInit {
  dataSource: any;

  usuario: any;

  cursalumSubscription!: Subscription;
  datosFiltrados$!: Observable<Inscripcion[]>;

  displayedColumns: string[] = ['idCurso', 'idAlumno', 'acciones'];

  constructor(
    public dialogRef: MatDialogRef<VerCursoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCurso,
    public fb: FormBuilder,
    private _cursoService: CursosService,
    public authService: AuthService,
    private ruta: Router,
    public dialog: MatDialog,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(
      cargarInscripcionesCurso({ idCurso: this.data.idCurso })
    );
    this.datosFiltrados$ = this.store.select(selectorListaInscripcionesCurso);
    /* this.cursalumSubscription = this._cursoService.cursoSubject.subscribe(
      (data) => {
        this.store.dispatch(
          inscripcionesCargadasCurso({ inscripciones: data })
        );
      }
    ); */
  }

  /*  ngOnDestroy(): void {
    this.cursalumSubscription.unsubscribe();
  } */

  /* eliminarAlumno(curso: Curso) {
    if (curso !== undefined) {
      this.ruta.navigate(['cursos']);
      this._cursoService.eliminarAlumnodelCurso(curso).subscribe(() => {
        this.store.dispatch(cargarCursosconAlumnos());
      });
    }
  } */

  formControl = new FormControl('', [Validators.required]);

  getError() {
    return this.formControl.hasError('required') ? 'El campo es requerido' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
