import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/usuario';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formLogin!: FormGroup;

  isLoginFailed = false;
  roles: string[] = [];
  errorMessage = '';

  constructor(
    public fb: FormBuilder,
    private authService: AuthService,
    private ruta: Router
  ) {
    this.formLogin = fb.group({
      usuario: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required]),
    });
  }

  onEnviar(event: Event) {
    event.preventDefault();
    const usuario = this.formLogin.value.usuario;
    const contrasena = this.formLogin.value.contrasena;
    console.log(usuario, contrasena);
    this.authService
      .IniciarSesion(usuario, contrasena)
      .subscribe((data: Usuario[]) => {
        if (data.length === 1) {
          console.log('Usuario logueado exitosamente', data);
          this.authService.establecerSesion(true, data[0]);
        } else {
          console.log('Error de autenticación');
          Swal.fire({
            icon: 'error',
            title: 'Error de credenciales',
            text: 'Error de credenciales',
            confirmButtonColor: '#0D47A1',
          });
        }
      });
  }
}
