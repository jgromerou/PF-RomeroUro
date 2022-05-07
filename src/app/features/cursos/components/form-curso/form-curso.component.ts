import { Component, Injectable, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { CursosService } from 'src/app/core/services/cursos.service';
import { DashboardCursosComponent } from '../dashboard-cursos/dashboard-cursos.component';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-form-curso',
  templateUrl: './form-curso.component.html',
  styleUrls: ['./form-curso.component.css'],
})
export class FormCursoComponent {
  @ViewChild(DashboardCursosComponent) myTable!: MatTable<any>;
  dataSaved = false;
  massage = null;

  formularioCurso!: FormGroup;

  constructor(
    private _mytable: DashboardCursosComponent,
    private _cursosService: CursosService,
    public fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.formularioCurso = fb.group({
      curso: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      horas: new FormControl('', [Validators.required]),
    });
  }

  reiniciarFormulario() {
    this.formularioCurso.reset();
    this.massage = null;
    this.dataSaved = false;
  }

  GuardarCurso() {
    this.dataSaved = true;
    const formalum = this.formularioCurso.value;

    this._cursosService.agregarCursos(formalum).subscribe((resp: any) => {
      setTimeout(() => {
        this.dataSaved = false;
        this._mytable.myTable.renderRows();
        this.reiniciarFormulario();
      }, 1300);

      return;
    });
    return;
  }
}
