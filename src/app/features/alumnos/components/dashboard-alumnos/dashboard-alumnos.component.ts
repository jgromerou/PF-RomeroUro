import { Component, OnInit, ViewChild } from '@angular/core';
import { Alumno } from './../../../../core/models/alumno';
import { AlumnosService } from './../../../../core/services/alumnos.service';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { EditarAlumnoComponent } from '../dialog/editar-alumno/editar-alumno.component';
import { EliminarAlumnoComponent } from '../dialog/eliminar-alumno/eliminar-alumno.component';
import { VerAlumnoComponent } from '../dialog/ver-alumno/ver-alumno.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard-alumnos',
  templateUrl: './dashboard-alumnos.component.html',
  styleUrls: ['./dashboard-alumnos.component.css'],
})
export class DashboardAlumnosComponent implements OnInit {
  @ViewChild(MatTable) myTable!: MatTable<any>;
  dataSaved = false;
  rol!: boolean;

  alumnSubscription!: Subscription;
  datos$!: Observable<any>;

  displayedColumns: string[] = [
    'idAlumno',
    'nombres',
    'apellidos',
    'email',
    'dni',
    'domicilio',
    'telefono',
    'acciones',
  ];

  constructor(
    private _alumnosService: AlumnosService,
    public authService: AuthService,
    private ruta: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.datos$ = this._alumnosService.obtenerDatos();
    this.alumnSubscription = this._alumnosService.alumnoSubject.subscribe(
      () => {
        this.datos$ = this._alumnosService.obtenerDatos();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.alumnSubscription) {
      this.alumnSubscription.unsubscribe();
    }
  }

  //Dialog Editar
  openDialogEditar(alumno: Alumno) {
    const dialogRef = this.dialog.open(EditarAlumnoComponent, {
      width: '300px',
      panelClass: 'makeItMiddle',
      data: {
        idAlumno: alumno.idAlumno,
        nombres: alumno.nombres,
        apellidos: alumno.apellidos,
        dni: alumno.dni,
        email: alumno.email,
        domicilio: alumno.domicilio,
        telefono: alumno.telefono,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('El Dialog se ha cerrado');
      this.ruta.navigate(['alumnos']);
      this._alumnosService.editarAlumno(result).subscribe((resp: any) => {
        this.ruta.navigate(['alumnos']);
        setTimeout(() => {
          this.myTable.renderRows();
        }, 300);
        return;
      });
    });
  }

  openDialogEliminar(alumno: Alumno) {
    const dialogRef = this.dialog.open(EliminarAlumnoComponent, {
      width: '250px',
      data: {
        idAlumno: alumno.idAlumno,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El Dialog se ha cerrado');
      this.ruta.navigate(['alumnos']);
      this._alumnosService.eliminarAlumno(result).subscribe((resp: any) => {
        this.ruta.navigate(['alumnos']);
        setTimeout(() => {
          this.myTable.renderRows();
        }, 300);
        return;
      });
      this.myTable.renderRows();
    });
  }

  openDialogVer(alumno: Alumno) {
    const dialogRef = this.dialog.open(VerAlumnoComponent, {
      width: '300px',
      panelClass: 'makeItMiddle',
      data: {
        idAlumno: alumno.idAlumno,
        nombres: alumno.nombres,
        apellidos: alumno.apellidos,
        dni: alumno.dni,
        email: alumno.email,
        domicilio: alumno.domicilio,
        telefono: alumno.telefono,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.ruta.navigate(['alumnos']);
      console.log('El Dialog se ha cerrado');
    });
  }
}
