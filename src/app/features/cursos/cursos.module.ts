import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCursosComponent } from './components/dashboard-cursos/dashboard-cursos.component';
import { CursosRoutingModule } from './cursos-routing.module';

import { FormCursoComponent } from './components/form-curso/form-curso.component';
import { EditarCursoComponent } from './components/dialog/editar-curso/editar-curso.component';
import { EliminarCursoComponent } from './components/dialog/eliminar-curso/eliminar-curso.component';
import { AppMaterialModule } from 'src/app/core/app.material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { VerCursoComponent } from './components/dialog/ver-curso/ver-curso.component';
/* import { EffectsModule } from '@ngrx/effects';
import { CursoEffects } from '../../curso.effects'; */
import { StoreModule } from '@ngrx/store';
import { cursoFeatureKey, cursoReducer } from './state/curso.reducer';

@NgModule({
  declarations: [
    DashboardCursosComponent,
    EditarCursoComponent,
    EliminarCursoComponent,
    FormCursoComponent,
    VerCursoComponent,
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    AppMaterialModule,
    SharedModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    StoreModule.forFeature(cursoFeatureKey, cursoReducer),
  ],
})
export class CursosModule {}
