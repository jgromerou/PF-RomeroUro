import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { CursosService } from 'src/app/core/services/cursos.service';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { DashboardInscripcionesComponent } from '../dashboard-inscripciones/dashboard-inscripciones.component';
@Component({
  selector: 'app-form-inscripcion',
  templateUrl: './form-inscripcion.component.html',
  styleUrls: ['./form-inscripcion.component.css'],
})
export class FormInscripcionComponent {
  @ViewChild(DashboardInscripcionesComponent) myTable!: MatTable<any>;
  dataSaved = false;
  massage = null;

  formularioInscripcion!: FormGroup;

  alumnoSubscription!: Subscription;
  datosAlumnos$!: Observable<any>;

  datosSubscription!: Subscription;
  datosCursos$!: Observable<any>;

  constructor(
    private _mytable: DashboardInscripcionesComponent,
    private _inscripcionesService: InscripcionesService,
    private _alumnosService: AlumnosService,
    private _cursosService: CursosService,
    public fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.formularioInscripcion = fb.group({
      idAlumno: new FormControl('', [Validators.required]),
      idCurso: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.datosAlumnos$ = this._alumnosService.obtenerDatos();
    this.alumnoSubscription = this._alumnosService.alumnoSubject.subscribe(
      () => {
        this.datosAlumnos$ = this._alumnosService.obtenerDatos();
      }
    );
    this.datosCursos$ = this._cursosService.obtenerDatos();
    this.alumnoSubscription = this._cursosService.cursoSubject.subscribe(() => {
      this.datosCursos$ = this._cursosService.obtenerDatos();
    });
  }

  ngOnDestroy(): void {
    this.alumnoSubscription.unsubscribe();
  }

  reiniciarFormulario() {
    this.formularioInscripcion.reset();
    this.massage = null;
    this.dataSaved = false;
  }

  GuardarInscripcion() {
    this.dataSaved = true;
    const forminscripcion = this.formularioInscripcion.value;
    this._inscripcionesService
      .agregarInscripcion(forminscripcion)
      .subscribe((resp: any) => {
        setTimeout(() => {
          this.dataSaved = false;
          this._mytable.myTable.renderRows();
          this.reiniciarFormulario();
        }, 300);

        return;
      });
    return;
  }
}
