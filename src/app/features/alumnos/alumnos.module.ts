import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAlumnosComponent } from './components/dashboard-alumnos/dashboard-alumnos.component';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { EditarAlumnoComponent } from './components/dialog/editar-alumno/editar-alumno.component';
import { EliminarAlumnoComponent } from './components/dialog/eliminar-alumno/eliminar-alumno.component';
import { FormComponent } from './components/form/form.component';
import { AppMaterialModule } from 'src/app/core/app.material';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VerAlumnoComponent } from './components/dialog/ver-alumno/ver-alumno.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DashboardAlumnosComponent,
    EditarAlumnoComponent,
    EliminarAlumnoComponent,
    FormComponent,
    VerAlumnoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AlumnosRoutingModule,
    AppMaterialModule,
    SharedModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  exports: [AlumnosRoutingModule],
})
export class AlumnosModule {}
