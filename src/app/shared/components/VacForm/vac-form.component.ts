import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IVaccine } from '../../interfaces/IVaccine';
import { VaccineService } from '../../services/Vaccine/vaccine.service';
import { FilePicker, PickFilesOptions, PickFilesResult } from '@capawesome/capacitor-file-picker';
import { FileOpener } from '@capawesome-team/capacitor-file-opener';
import { LocalNotificationsService } from '../../controllers/localNotificacions/local-notifications.service';
import { ToastService } from '../../controllers/toast/toast.service';

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
  @Input() mode: 'register' | 'update' = 'register';


  public vacunaForm!: FormGroup;

  public nombreVacuna!: FormControl;
  public fechaVacunacion!: FormControl;
  public certificado!: FormControl;
  public filePath: any;

  constructor(private fb: FormBuilder, private vaccineService: VaccineService, private readonly localNoticeSrv: LocalNotificationsService, private readonly toastSrv: ToastService) {}

  ngOnInit(){
    this.initForm();
  }

  public async handleFormSubmit() {
    if (this.vacunaForm.valid) {
      const vaccineData: IVaccine = this.vacunaForm.value;
  
      if (this.mode === 'register' && this.petId) {
        // Agrega una nueva vacuna
        try {
          await this.vaccineService.addVaccine(this.petId, vaccineData);
          console.log("Formulario enviado: ", vaccineData);
        } catch (error) {
          console.error("Error al agregar la vacuna: ", error);
        }
      } else if (this.mode === 'update' && this.existingVacuna && this.petId) {
        // Actualiza la vacuna existente
        try {
          await this.vaccineService.updateVaccine(this.petId, this.existingVacuna.idVaccine, vaccineData);
          console.log("Formulario actualizado: ", vaccineData);
        } catch (error) {
          console.error("Error al actualizar la vacuna: ", error);
        }
      } else {
        console.log("Error: No se proporcionó un ID de mascota o modo inválido.");
      }
    } else {
      console.log('Formulario inválido');
    }
  }
  

  async addVac(){
    if(this.vacunaForm.valid){
      try{
        await this.vaccineService.addVaccine(this.petId, this.vacunaForm.value);
        this.localNoticeSrv.showNotification(1, 'Excelente', 'Se ha añadido una vacuna!');
        this.vacunaForm.reset();
      }catch(e){
        this.toastSrv.showError('Error al registrar la mascota:');
          console.error('Error al registrar la mascota:', e);
      }
    } else {
      this.toastSrv.showError('Formulario invalido.');
        console.error('Formulario inválido:', this.vacunaForm.errors);
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
        path: 'content://com.android.providers.downloads.documents/document/msf%3A1000000073',
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
