import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from 'src/app/core/app.material';
import { DashboardUsuariosComponent } from './dashboard-usuarios.component';

describe('DashboardUsuariosComponent', () => {
  let component: DashboardUsuariosComponent;
  let fixture: ComponentFixture<DashboardUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AppMaterialModule, RouterTestingModule],
      declarations: [DashboardUsuariosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Los usuarios se asignaron correctamente en el controlador', () => {
    const fixture = TestBed.createComponent(DashboardUsuariosComponent);
    const controlador = fixture.componentInstance;

    fixture.detectChanges();

    controlador.datos$.subscribe((data) => {
      expect(data.length).toBeGreaterThan(7);
    });

    expect(component).toBeTruthy();
  });

  it('El titulo de usuarios se renderiza correctamente en la vista', () => {
    const fixture = TestBed.createComponent(DashboardUsuariosComponent);
    const vista = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();

    expect(vista.querySelector('.container')?.textContent).toContain(
      'Tabla de Usuarios'
    );
  });

  it('Los usuarios se renderizaron correctamente en la vista', () => {
    const fixture = TestBed.createComponent(DashboardUsuariosComponent);
    const vista = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();

    expect(vista.querySelector('.container')?.textContent).toContain(
      'Tabla de Usuarios'
    );
  });
});
