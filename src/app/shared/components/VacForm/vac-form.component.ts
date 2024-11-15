import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IVaccine } from '../../interfaces/IVaccine';
import { VaccineService } from '../../services/Vaccine/vaccine.service';
import { FilePicker, PickFilesOptions, PickFilesResult } from '@capawesome/capacitor-file-picker';

@Component({
  selector: 'app-form-vacunas',
  templateUrl: './vac-form.component.html',
  styleUrls: ['./vac-form.component.scss']
})
export class FormVacunasComponent {

  @Input() title: string = '';
  @Input() message: string = '';
  @Input() existingVacuna: IVaccine | null = null;


  public vacunaForm!: FormGroup;

  public nombreVacuna!: FormControl;
  public fechaVacunacion!: FormControl;
  public certificado!: FormControl;

  constructor(private fb: FormBuilder, private vaccineService: VaccineService) {}

  ngOnInit(){
    this.initForm();
  }

  onSubmit() {
    if (this.vacunaForm.valid) {
      const vaccineData = this.vacunaForm.value;
      if(this.existingVacuna){
        //actualiza vacuna
        this.vaccineService.updateVaccine(this.existingVacuna,vaccineData);
        console.log("Formulario actualizado: ", vaccineData);
      } else {
        //agrega vacuna
        this.vaccineService.createVaccine(vaccineData);
        console.log("Formulario enviado: ", vaccineData);
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  //capacitor-file-picker
  async pickFile(){
    try{
      const result = await FilePicker.pickFiles({
        types: ['application/pdf'] // Puedes especificar otros tipos si es necesario
      });

      if (result.files && result.files.length > 0) {
        const file = result.files[0];
        this.certificado.setValue(file.name);
        console.log('Archivo seleccionado:', file);
      }
    } catch (error){
      console.log('Error al seleccionar archivo: ', error);
    }
  }

  private initForm(){

    this.nombreVacuna = new FormControl('', [Validators.required]);
    this.fechaVacunacion = new FormControl('', [Validators.required]);
    this.certificado = new FormControl('');

    this.vacunaForm = new FormGroup({
      nombreVacuna: this.nombreVacuna,
      fechaVacunacion: this.fechaVacunacion,
      certificado: this.certificado
    });
  }
}
