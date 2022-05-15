import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { EditarCursoComponent } from '../dialog/editar-curso/editar-curso.component';
import { EliminarCursoComponent } from '../dialog/eliminar-curso/eliminar-curso.component';
import { CursosService } from 'src/app/core/services/cursos.service';
import { VerCursoComponent } from '../dialog/ver-curso/ver-curso.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Store } from '@ngrx/store';
import { cargarCursos, cursosCargados } from '../../state/curso.actions';
import { Curso } from 'src/app/core/models/curso';
import {
  selectorCargandoCursos,
  selectorListaCursos,
} from '../../state/curso.selectors';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-dashboard-cursos',
  templateUrl: './dashboard-cursos.component.html',
  styleUrls: ['./dashboard-cursos.component.css'],
})
export class DashboardCursosComponent implements OnInit {
  @ViewChild(MatTable) myTable!: MatTable<any>;
  dataSaved = false;
  rol!: boolean;

  cursSubscription!: Subscription;
  datos$!: Observable<Curso[]>;

  curso!: any;

  cargando$!: Observable<Curso>;

  displayedColumns: string[] = [
    'idCurso',
    'curso',
    'descripcion',
    'horas',
    'acciones',
  ];

  constructor(
    private _cursoService: CursosService,
    public authService: AuthService,
    private ruta: Router,
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(cargarCursos());
    this.datos$ = this.store.select(selectorListaCursos);
    this.cursSubscription = this._cursoService.cursoSubject.subscribe(
      (data) => {
        this.store.dispatch(cursosCargados({ cursos: data }));
      }
    );
  }

  ngOnDestroy(): void {
    this.cursSubscription.unsubscribe();
  }

  openDialogEditar(curso: Curso) {
    const dialogRef = this.dialog.open(EditarCursoComponent, {
      width: '300px',
      panelClass: 'makeItMiddle',
      data: {
        idCurso: curso.idCurso,
        curso: curso.curso,
        descripcion: curso.descripcion,
        horas: curso.horas,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El Dialog se ha cerrado');

      this._cursoService.editarCurso(result).subscribe(() => {
        this.store.dispatch(cargarCursos());
      });
    });
  }

  openDialogEliminar(curso: Curso) {
    const dialogRef = this.dialog.open(EliminarCursoComponent, {
      width: '250px',
      data: [
        {
          idCurso: curso.idCurso,
        },
      ],
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El Dialog se ha cerrado');
      if (result !== undefined) {
        this.ruta.navigate(['cursos']);
        this._cursoService.eliminarCurso(result).subscribe((resp: any) => {
          setTimeout(() => {
            this.myTable.renderRows();
            console.log(this.myTable.renderRows());
          }, 2000);
          return;
        });
      } else {
        this.ruta.navigate(['cursos']);
      }
      this.myTable.renderRows();
    });
  }

  openDialogVer(curso: Curso) {
    const dialogRef = this.dialog.open(VerCursoComponent, {
      width: '300px',
      panelClass: 'makeItMiddle',
      data: {
        idCurso: curso.idCurso,
        curso: curso.curso,
        descripcion: curso.descripcion,
        horas: curso.horas,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('El Dialog se ha cerrado');
      this.ruta.navigate(['cursos']);
    });
  }
}
