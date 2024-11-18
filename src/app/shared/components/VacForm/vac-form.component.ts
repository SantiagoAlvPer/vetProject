import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IVaccine } from '../../interfaces/IVaccine';
import { VaccineService } from '../../services/Vaccine/vaccine.service';
import { FilePicker, PickFilesOptions, PickFilesResult } from '@capawesome/capacitor-file-picker';
import { FileOpener } from '@capawesome-team/capacitor-file-opener';

@Component({
  selector: 'app-form-vacunas',
  templateUrl: './vac-form.component.html',
  styleUrls: ['./vac-form.component.scss']
})
export class FormVacunasComponent {

  @Input() title: string = '';
  @Input() message: string = '';
  @Input() existingVacuna: IVaccine | null = null;
  @Input() petId: string = '';


  public vacunaForm!: FormGroup;

  public nombreVacuna!: FormControl;
  public fechaVacunacion!: FormControl;
  public certificado!: FormControl;
  public filePath: any;

  constructor(private fb: FormBuilder, private vaccineService: VaccineService) {}

  ngOnInit(){
    this.initForm();
  }

  async onSubmit() {
    if (this.vacunaForm.valid) {
      const vaccineData: IVaccine = this.vacunaForm.value;
      if (this.existingVacuna && this.petId) {
        // Actualiza la vacuna existente
        try {
          await this.vaccineService.updateVaccine(this.petId, this.existingVacuna.idVaccine, vaccineData);
          console.log("Formulario actualizado: ", vaccineData);
        } catch (error) {
          console.error("Error al actualizar la vacuna: ", error);
        }
      } else if (this.petId) {
        // Agrega una nueva vacuna
        try {
          await this.vaccineService.addVaccine(this.petId, vaccineData);
          console.log("Formulario enviado: ", vaccineData);
        } catch (error) {
          console.error("Error al agregar la vacuna: ", error);
        }
      } else {
        console.log("Error: No se proporcionó un ID de mascota.");
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  //capacitor-file-picker
  async pickFile(){
    try{
      const result = await FilePicker.pickFiles({
        types: ['application/pdf'] 
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

  //open-file
  async openFile(){
    try{
      await FileOpener.openFile({
        path: this.filePath,
      });
    }catch(e){
      console.log('Error al abrir el archivo: ', e);
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
