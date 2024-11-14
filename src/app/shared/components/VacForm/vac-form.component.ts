import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-vacunas',
  templateUrl: './vac-form.component.html',
  styleUrls: ['./vac-form.component.scss']
})
export class FormVacunasComponent {
  public vacunaForm!: FormGroup;

  /*constructor(private fb: FormBuilder) {
    this.vacunaForm = this.fb.group({
      nombreMascota: ['', [Validators.required]],
      tipoVacuna: ['', [Validators.required]],
      fechaVacunacion: ['', [Validators.required]],
      observaciones: ['']
    });
  }*/

  public nombreMascota!: FormControl;
  public tipoVacuna!: FormControl;
  public fechaVacunacion!: FormControl;
  public observaciones!: FormControl;

  ngOnInit(){
    this.initForm();
  }

  onSubmit() {
    if (this.vacunaForm.valid) {
      console.log('Formulario enviado:', this.vacunaForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  private initForm(){

    this.nombreMascota = new FormControl('', [Validators.required]);
    this.tipoVacuna = new FormControl('', [Validators.required]);
    this.fechaVacunacion = new FormControl('', [Validators.required]);
    this.observaciones = new FormControl('');

    this.vacunaForm = new FormGroup({
      nombreMascota: this.nombreMascota,
      tipoVacuna: this.tipoVacuna,
      fechaVacunacion: this.fechaVacunacion,
      observaciones: this.observaciones
    });
  }
}
