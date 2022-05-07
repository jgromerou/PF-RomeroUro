import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAlumno } from 'src/app/core/interfaces/dialogAlumno';
import { AlumnosService } from 'src/app/core/services/alumnos.service';

@Component({
  selector: 'app-ver-alumno',
  templateUrl: './ver-alumno.component.html',
  styleUrls: ['./ver-alumno.component.css'],
})
export class VerAlumnoComponent {
  dataSource: any;

  constructor(
    public dialogRef: MatDialogRef<VerAlumnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogAlumno,
    public fb: FormBuilder,
    private alumnosService: AlumnosService
  ) {}

  formControl = new FormControl('', [Validators.required]);

  getError() {
    return this.formControl.hasError('required') ? 'El campo es requerido' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
