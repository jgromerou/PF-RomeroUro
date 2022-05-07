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
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.datos$ = this._usuariosService.obtenerDatos();
    this.usuarioSubscription = this._usuariosService.usuarioSubject.subscribe(
      () => {
        this.datos$ = this._usuariosService.obtenerDatos();
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
        this._usuariosService.editarUsuario(result).subscribe((resp: any) => {
          setTimeout(() => {
            this.myTable.renderRows();
          }, 300);
          return;
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
        this._usuariosService.eliminarUsuario(result).subscribe((resp: any) => {
          setTimeout(() => {
            this.myTable.renderRows();
          }, 300);
          return;
        });
        this.myTable.renderRows();
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
    });
  }
}
