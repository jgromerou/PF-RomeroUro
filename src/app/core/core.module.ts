import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './app.material';
import { AlumnosService } from './services/alumnos.service';
import { HttpClientModule } from '@angular/common/http';
import { CursosService } from './services/cursos.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingModule,
    AppMaterialModule,
    HttpClientModule,
  ],
  exports: [AppRoutingModule, AppMaterialModule],
  providers: [AlumnosService, CursosService],
})
export class CoreModule {}
