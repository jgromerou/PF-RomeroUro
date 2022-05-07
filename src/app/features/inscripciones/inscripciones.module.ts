import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { DashboardInscripcionesComponent } from './components/dashboard-inscripciones/dashboard-inscripciones.component';
import { EditarInscripcionComponent } from './components/dialog/editar-inscripcion/editar-inscripcion.component';
import { EliminarInscripcionComponent } from './components/dialog/eliminar-inscripcion/eliminar-inscripcion.component';
import { FormInscripcionComponent } from './components/form-inscripcion/form-inscripcion.component';
import { AppMaterialModule } from 'src/app/core/app.material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { VerInscripcionComponent } from './components/dialog/ver-inscripcion/ver-inscripcion.component';

@NgModule({
  declarations: [
    DashboardInscripcionesComponent,
    EditarInscripcionComponent,
    EliminarInscripcionComponent,
    FormInscripcionComponent,
    VerInscripcionComponent,
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    AppMaterialModule,
    SharedModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
})
export class InscripcionesModule {}
