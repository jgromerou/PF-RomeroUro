import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { EditarCursoComponent } from '../dialog/editar-curso/editar-curso.component';
import { EliminarCursoComponent } from '../dialog/eliminar-curso/eliminar-curso.component';
import { Curso } from 'src/app/core/models/curso';
import { CursosService } from 'src/app/core/services/cursos.service';
import { VerCursoComponent } from '../dialog/ver-curso/ver-curso.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

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
  datos$!: Observable<any>;

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
    public dialog: MatDialog
  ) {
    /* var values = JSON.parse(localStorage.getItem('session') || 'false'); */
    /* if (values.usuario !== undefined) {
      if (values.usuario.rol === 1) {
        this.rol = true;
      } else {
        this.rol = false;
      }
    } else {
      this.rol = false;
    } */
    console.log('rol en curso', this.authService.isAdmin);
  }

  ngOnInit(): void {
    this.datos$ = this._cursoService.obtenerDatos();
    this.cursSubscription = this._cursoService.cursoSubject.subscribe(() => {
      this.datos$ = this._cursoService.obtenerDatos();
    });
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

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('El Dialog se ha cerrado');

      if (result !== undefined) {
        this._cursoService.editarCurso(result).subscribe((resp: any) => {
          this.ruta.navigate(['cursos']);
          setTimeout(() => {
            this.myTable.renderRows();
          }, 300);
          return;
        });
      } else {
        this.ruta.navigate(['cursos']);
      }
    });
  }

  openDialogEliminar(curso: Curso) {
    const dialogRef = this.dialog.open(EliminarCursoComponent, {
      width: '250px',
      data: {
        idCurso: curso.idCurso,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El Dialog se ha cerrado');
      if (result !== undefined) {
        this.ruta.navigate(['cursos']);
        this._cursoService.eliminarCurso(result).subscribe((resp: any) => {
          setTimeout(() => {
            this.myTable.renderRows();
          }, 300);
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
