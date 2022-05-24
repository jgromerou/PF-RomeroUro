import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { Usuario } from 'src/app/core/models/usuario';
import { VerUsuarioComponent } from '../dialog/ver-usuario/ver-usuario.component';
import { EliminarUsuarioComponent } from '../dialog/eliminar-usuario/eliminar-usuario.component';
import { EditarUsuarioComponent } from '../dialog/editar-usuario/editar-usuario.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { cargarUsuarios, usuariosCargados } from '../../state/usuarios.actions';
import { selectorListaUsuarios } from '../../state/usuarios.selectors';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-usuarios',
  templateUrl: './dashboard-usuarios.component.html',
  styleUrls: ['./dashboard-usuarios.component.css'],
})
export class DashboardUsuariosComponent implements OnInit {
  @ViewChild(MatTable) myTable!: MatTable<any>;
  dataSaved = false;

  usuarioSubscription!: Subscription;
  datos$!: Observable<any>;

  displayedColumns: string[] = [
    'idUsuario',
    'usuario',
    'contrasena',
    'rol',
    'acciones',
  ];

  constructor(
    private _usuariosService: UsuariosService,
    public authService: AuthService,
    public dialog: MatDialog,
    private store: Store,
    private ruta: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(cargarUsuarios());
    this.datos$ = this.store.select(selectorListaUsuarios);
    this.usuarioSubscription = this._usuariosService.usuarioSubject.subscribe(
      (data) => {
        this.store.dispatch(usuariosCargados({ usuarios: data }));
      }
    );
  }

  ngOnDestroy(): void {
    this.usuarioSubscription.unsubscribe();
  }

  openDialogEditar(usuario: Usuario) {
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      width: '300px',
      panelClass: 'makeItMiddle',
      data: {
        idUsuario: usuario.idUsuario,
        usuario: usuario.usuario,
        contrasena: usuario.contrasena,
        rol: usuario.rol,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('El Dialog se ha cerrado');
      if (result !== undefined) {
        /* this._usuariosService.editarUsuario(result).subscribe((resp: any) => {
          setTimeout(() => {
            this.myTable.renderRows();
          }, 300);
          return;
        }); */
        this._usuariosService.editarUsuario(result).subscribe(() => {
          this.store.dispatch(cargarUsuarios());
        });
      }
    });
  }

  openDialogEliminar(usuario: Usuario) {
    const dialogRef = this.dialog.open(EliminarUsuarioComponent, {
      width: '250px',
      data: {
        idUsuario: usuario.idUsuario,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El Dialog se ha cerrado');
      if (result !== undefined) {
        /* this._usuariosService.eliminarUsuario(result).subscribe((resp: any) => {
          setTimeout(() => {
            this.myTable.renderRows();
          }, 300);
          return;
        });
        this.myTable.renderRows(); */
        this.ruta.navigate(['usuarios']);
        this._usuariosService.eliminarUsuario(result).subscribe(() => {
          this.store.dispatch(cargarUsuarios());
        });
      }
    });
  }

  openDialogVer(usuario: Usuario) {
    const dialogRef = this.dialog.open(VerUsuarioComponent, {
      width: '300px',
      panelClass: 'makeItMiddle',
      data: {
        idUsuario: usuario.idUsuario,
        usuario: usuario.usuario,
        contrasena: usuario.contrasena,
        rol: usuario.rol,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('El Dialog se ha cerrado');
      this.ruta.navigate(['usuarios']);
    });
  }
}
