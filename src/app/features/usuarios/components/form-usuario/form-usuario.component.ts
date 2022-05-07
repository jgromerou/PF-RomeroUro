import { Component, Injectable, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { DashboardUsuariosComponent } from '../dashboard-usuarios/dashboard-usuarios.component';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css'],
})
export class FormUsuarioComponent {
  @ViewChild(DashboardUsuariosComponent) myTable!: MatTable<any>;
  dataSaved = false;
  massage = null;

  formularioUsuario!: FormGroup;

  constructor(
    private _mytable: DashboardUsuariosComponent,
    private _usuariosService: UsuariosService,
    public fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.formularioUsuario = fb.group({
      usuario: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required]),
      rol: new FormControl('', [Validators.required]),
    });
  }

  reiniciarFormulario() {
    this.formularioUsuario.reset();
    this.massage = null;
    this.dataSaved = false;
  }

  GuardarUsuario() {
    this.dataSaved = true;
    const formalum = this.formularioUsuario.value;

    this._usuariosService.agregarUsuarios(formalum).subscribe((resp: any) => {
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
