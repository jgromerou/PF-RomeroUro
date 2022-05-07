import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { DashboardUsuariosComponent } from './components/dashboard-usuarios/dashboard-usuarios.component';
import { AppMaterialModule } from 'src/app/core/app.material';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarUsuarioComponent } from './components/dialog/editar-usuario/editar-usuario.component';
import { VerUsuarioComponent } from './components/dialog/ver-usuario/ver-usuario.component';
import { EliminarUsuarioComponent } from './components/dialog/eliminar-usuario/eliminar-usuario.component';
import { FormUsuarioComponent } from './components/form-usuario/form-usuario.component';

@NgModule({
  declarations: [DashboardUsuariosComponent, EditarUsuarioComponent, VerUsuarioComponent, EliminarUsuarioComponent, FormUsuarioComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    AppMaterialModule,
    SharedModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
})
export class UsuariosModule {}
